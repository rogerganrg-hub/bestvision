// packages/contracts/src/usecases/aaplication.ts
import type { Application } from "../domain/application.js";

export type CreateApplicationInput = {
  name?: unknown;
  email?: unknown;
};

export type CreateApplicationOk = {
  ok: true;
  applicationId: string;
  status: "created";
  received: { name: string; email: string };
};

export type CreateApplicationValidationError = {
  ok: false;
  error: "validation_error" | "internal_error";
  fields: { name?: "required"; email?: "required" };
};

export type CreateApplicationResult = CreateApplicationOk | CreateApplicationValidationError;


export type GetApplicationResult =
  | { ok: true; application: Application }
  | { ok: false; error: "not_found" | "internal_error" };

export type ListApplicationsOk = {
  ok: true;
  items: Application[];
  limit: number;
};

export type ListApplicationsInternalError = { 
  ok: false; 
  error: "internal_error"; 
};

export type ListApplicationsResult = ListApplicationsOk | ListApplicationsInternalError;
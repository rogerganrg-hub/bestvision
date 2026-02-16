// packages/contracts/src/usecases/aaplication.ts
import type { Application } from "../domain/application.js";

export type CreateApplicationInput = {
  name?: unknown;
  email?: unknown;
};

export type CreateApplicationValidationError = {
  ok: false;
  error: "validation_error";
  fields: { name?: "required"; email?: "required" };
};

export type CreateApplicationOk = {
  ok: true;
  applicationId: string;
  status: "created";
  received: { name: string; email: string };
};

export type CreateApplicationResult = CreateApplicationOk | CreateApplicationValidationError;

export type GetApplicationResult =
  | { ok: true; application: Application }
  | { ok: false; error: "not_found" };

export type ListApplicationsResult = {
  ok: true;
  items: Application[];
  limit: number;
};

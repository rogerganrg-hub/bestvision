import { ErrorType } from "./errors/index.js";

// packages/contracts/src/index.ts
export type { Application } from "./domain/application.js";
export type { PlaidItem } from "./domain/plaid.js";
export type { Actor } from "./domain/actor.js";

export type { ApplicationRepo } from "./repos/application-repo.js";
export type { PlaidItemRepo } from "./repos/plaid-item-repo.js";

export type { 
    CreateApplicationInput, 
    CreateApplicationResult, 
    CreateApplicationValidationError,
    GetApplicationResult,
    ListApplicationsResult,
 } from "./usecases/index.js";

export { ErrorType } from "./errors/index.js";
// export type { ErrorType as ErrorTypeUnion } from "./errors/index.js";

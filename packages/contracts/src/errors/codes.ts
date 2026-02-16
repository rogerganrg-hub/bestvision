// packages/contracts/src/errors/codes.ts

export const ErrorType = {
  ValidationError: "validation_error",
  NotFound: "not_found",
  InternalError: "internal_error",
  PlaidNotConfigured: "plaid_not_configured",
  RepoError: "repo_error",
} as const;

// export type ErrorType = typeof ErrorType[keyof typeof ErrorType];

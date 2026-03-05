// packages/contracts/src/common/result.ts

type Ok<T> = { ok:true; value:T }
type InternalError = { ok:false; error:"internal_error" }
export type Result<T> = Ok<T> | InternalError

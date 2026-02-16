// apps/api/src/infra/repos/plaid-item-repo.contract.ts
import { PlaidItem } from "../domain/plaid.js";

export interface PlaidItemRepo {
  upsert(item: PlaidItem): Promise<void>;
  getById(itemId: string): Promise<PlaidItem | null>;
}

// apps/api/src/infra/repos/plaid-item-repo.contract.ts
export interface PlaidItem {
  itemId: string;
  accessToken: string; // never log
  createdAt: string;
  updatedAt: string;
}

export interface PlaidItemRepo {
  upsert(item: PlaidItem): Promise<void>;
  getById(itemId: string): Promise<PlaidItem | null>;
}

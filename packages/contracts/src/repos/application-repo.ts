// contracts/src/repos/application-repo.ts
import { Application } from "../domain/application.js";

export interface ApplicationRepo {
  create(application: Application): Promise<void>;
  getById(applicationId: string): Promise<Application | null>;
  listLatest(limit: number): Promise<Application[]>;
}

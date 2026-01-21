export type ApplicationStatus = "submitted" | string;

export interface Application {
  applicationId: string;
  name: string;
  email: string;
  status: ApplicationStatus;
  createdAt: string; // ISO (UTC)
}

export interface ApplicationRepo {
  create(application: Application): Promise<void>;
  getById(applicationId: string): Promise<Application | null>;
  listLatest(limit: number): Promise<Application[]>;
}

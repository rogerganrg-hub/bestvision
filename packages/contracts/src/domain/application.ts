export type ApplicationStatus = "submitted" | string;

export interface Application {
  applicationId: string;
  name: string;
  email: string;
  status: ApplicationStatus;
  createdAt: string; // ISO (UTC)
}

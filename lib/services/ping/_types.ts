type HealthCheckResponse = {
  version: string;
  message: string;
  database: boolean;
  lastBuild: string;
};

export type { HealthCheckResponse };

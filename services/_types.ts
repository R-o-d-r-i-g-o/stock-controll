type HealthCheckResponse = {
  version: string;
  message: string;
  database: boolean;
  last_build: string;
}

export type { HealthCheckResponse }
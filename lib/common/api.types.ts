enum ErrorCode {
  Server = "SERVER_ERROR",
  Database = "DATABASE_ERROR",
}

type PrismaErrorMessageMap = {
  [key: string]: {
    message: string;
    status: number;
  };
};

type ApiErrorResponse = {
  message: string;
  ErrorCode: ErrorCode;
  stackTrace?: string;
  developerMessage: string | unknown;
};

export { ErrorCode, type PrismaErrorMessageMap, type ApiErrorResponse };

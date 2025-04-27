import { Prisma } from "../prisma/prisma.client";

import { handleFormatPrismaError } from "./api.model";
import { ApiErrorResponse, ErrorCode } from "./api.types";

class ApiErrorBuilder {
  private httpStatus: number;
  private responseError: ApiErrorResponse;

  constructor(message?: string, status?: number) {
    this.httpStatus = status ?? 500;
    this.responseError = {
      ErrorCode: ErrorCode.Server,
      developerMessage: message ?? "Erro desconhecido. Não mapeado ainda.",
      message: message ?? "Ocorreu um erro inesperado. Tente novamente depois.",
    };
  }

  setStatus(status: number): ApiErrorBuilder {
    this.httpStatus = status;
    return this;
  }

  setMessage(message: string): ApiErrorBuilder {
    this.responseError.message = message;
    return this;
  }

  setStackTrace(stackTrace?: string): ApiErrorBuilder {
    this.responseError.stackTrace = stackTrace;
    return this;
  }

  setInternalStatus(errorCode: ErrorCode): ApiErrorBuilder {
    this.responseError.ErrorCode = errorCode;
    return this;
  }

  setDeveloperMessage(developerMessage: string | unknown): ApiErrorBuilder {
    this.responseError.developerMessage = developerMessage;
    return this;
  }

  formatResponseError() {
    const stackTrace = process.env.NODE_ENV === "development" ? this.responseError.stackTrace : null;

    return { ...this.responseError, stackTrace };
  }

  ToNextApiError() {
    return Response.json({ error: this.formatResponseError() }, { status: this.httpStatus });
  }
}

const errorHandler = (err: unknown): ApiErrorBuilder => {
  const builder = new ApiErrorBuilder();

  if (err instanceof Error) {
    builder
      .setStatus(500)
      .setMessage(err.message)
      .setStackTrace(err.stack)
      .setInternalStatus(ErrorCode.Server)
      .setDeveloperMessage(err.cause ?? "Erro desconhecido");
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const mappedError = handleFormatPrismaError(err.code);
    builder.setStatus(mappedError.status).setMessage(mappedError.message).setStackTrace(err.stack).setInternalStatus(ErrorCode.Database).setDeveloperMessage(err.message);
  }

  return builder;
};

const launchError = (message: string, status: number) => {
  const builder = new ApiErrorBuilder(message, status);
  return builder;
};

export { errorHandler, launchError };

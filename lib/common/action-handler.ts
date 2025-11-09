import { ZodError } from "zod";
import { Prisma } from "../prisma/prisma.client";
import { handleFormatPrismaError } from "./api.model";

type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Wrapper helper para Server Actions com tratamento de erro simplificado
 */
export async function actionHandler<T>(
  fn: () => Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    // Erro de validação Zod
    if (error instanceof ZodError) {
      const firstError = error.errors[0];
      return { 
        success: false, 
        error: firstError.message 
      };
    }

    // Erro do Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const mappedError = handleFormatPrismaError(error.code);
      return { 
        success: false, 
        error: mappedError.message 
      };
    }

    // Erro genérico
    if (error instanceof Error) {
      return { 
        success: false, 
        error: error.message 
      };
    }

    // Erro desconhecido
    return { 
      success: false, 
      error: "Ocorreu um erro inesperado" 
    };
  }
}


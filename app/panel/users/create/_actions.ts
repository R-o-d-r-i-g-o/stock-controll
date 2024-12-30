"use server";

import axios from "axios";
import * as m from "./_models";

import { createUser } from "@/services";
import { createUserSchema, YupError } from "@/schemas";

async function handleSubmit(
  _: m.Entries,
  formData: FormData
): Promise<m.Entries> {
  try {
    const data = await processForm(formData);
    if ("error" in data) throw new Error(data.error);

    await createUser(data);
    return { message: "success" };
  } catch (err) {
    const message = getErrorMessage(err);
    return { message };
  }
}

async function processForm(formData: FormData) {
  const data = createUserSchema.cast({
    name: formData.get("name"),
    email: formData.get("email"),
    roleId: formData.get("roleId"),
    password: formData.get("password"),
  });

  try {
    const validatedData = await createUserSchema.validate(data);
    return validatedData;
  } catch (err) {
    const error = err as YupError;
    return { error: error.message };
  }
}

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return "Houve um erro ao processar a solicitação";
  }

  if (err instanceof Error) {
    return err.message || "Um erro inesperado ocorreu";
  }

  return "Um erro inesperado ocorreu";
}

export { handleSubmit };

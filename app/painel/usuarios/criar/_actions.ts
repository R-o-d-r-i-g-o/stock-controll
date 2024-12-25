"use server"

import axios from "axios";

import { createNewUser } from "@/services"
import { createUserSchema, ValidationError } from "@/schemas";

type CreateUserFormEntries = {
  name: string;
  email: string;
  role_id: string | number;
  password: string
}

async function handleSubmit(state: Error | undefined | null, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries()) as CreateUserFormEntries;
    data.role_id = parseInt(data.role_id as string, 10);

    const result = await createUserSchema.validate(data, { abortEarly: false });
    await createNewUser(result)
  } catch (err) {
    if (err instanceof ValidationError)
      return new Error(err.errors[0])

    if (axios.isAxiosError(err))
      return new Error("Houve um erro ao processar a solicitação")

    return err as Error
  }
}

export { handleSubmit }
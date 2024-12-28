"use server"

import axios from "axios";
import * as m from './_models'

import { createUser } from "@/services"
import { createUserSchema, ValidationError } from "@/schemas";

async function handleSubmit(state: m.InitialStateEntries, formData: FormData): Promise<m.InitialStateEntries> {
  try {
    const data = Object.fromEntries(formData.entries()) as m.CreateUserFormEntries
    const payload = {
      ...data,
      role_id: parseInt(data.role_id as string, 10),
    }

    const result = await createUserSchema.validate(payload, { abortEarly: false });
    await createUser(result)

    return {
      message: "success",
      fieldValues: data
    }
  } catch (err) {
    let message = ""

    if (err instanceof ValidationError)
      message = err.errors[0]

    if (axios.isAxiosError(err))
      message = "Houve um erro ao processar a solicitação"

    return {
      ...m.initalState,
      message
    }
  }
}

export { handleSubmit }
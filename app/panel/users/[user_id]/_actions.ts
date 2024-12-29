"use server";

import axios from "axios";
import * as m from "./_models";

import { updateUser } from "@/services";
import { updateUserSchema, ValidationError } from "@/schemas";

async function handleSubmit(
  state: m.InitialStateEntries,
  formData: FormData
): Promise<m.InitialStateEntries> {
  try {
    const data = Object.fromEntries(
      formData.entries()
    ) as m.CreateUserFormEntries;
    const payload = {
      ...data,
      role_id: parseInt(data.role_id, 10),
      id: parseInt(state.fieldValues.id, 10),
    };

    const result = await updateUserSchema.validate(payload, {
      abortEarly: false,
    });
    await updateUser({
      ...result,
      password: result.password ?? undefined,
    });

    return {
      message: "success",
      fieldValues: data,
    };
  } catch (err) {
    let message = "";

    if (err instanceof ValidationError) message = err.errors[0];

    if (axios.isAxiosError(err))
      message = "Houve um erro ao processar a solicitação";

    return {
      ...m.initalState,
      message,
    };
  }
}

export { handleSubmit };

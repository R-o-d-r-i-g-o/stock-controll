"use server";

import { ValidationError } from "yup";
import * as m from "./_models";
import axios from "axios";

import { createShoeSchema } from "@/schemas";
import * as svc from "@/services";

async function handleCreateShoeSubmit(
  state: m.InitialStateEntries,
  formData: FormData
): Promise<m.InitialStateEntries> {
  try {
    const data = Object.fromEntries(
      formData.entries()
    ) as m.CreateUserFormEntries;
    const payload = {
      ...data,
    };

    const result = await createShoeSchema.validate(payload);
    await svc.createShoe(result);

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
      ...state,
      message,
    };
  }
}

export { handleCreateShoeSubmit };

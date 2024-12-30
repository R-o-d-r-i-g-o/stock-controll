"use server";

import axios from "axios";
import * as m from "./_models";

import { updateShoe } from "@/services";
import { itemUpdateSchema, ValidationError } from "@/schemas";

async function handleSubmit(
  state: m.InitialStateEntries,
  formData: FormData
): Promise<m.InitialStateEntries> {
  try {
    const data = Object.fromEntries(
      formData.entries()
    ) as m.CreateUserFormEntries;
    const payload = {
      id: parseInt(state.fieldValues.id),
      sku: data.sku,
      size: parseInt(data.size),
      price: parseFloat(data.price),
      shoeId: parseInt(data.shoeId),
    };

    const result = await itemUpdateSchema.validate(payload);
    await updateShoe(result);

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

export { handleSubmit };

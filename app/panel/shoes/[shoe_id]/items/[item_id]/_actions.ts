"use server";

import axios from "axios";
import * as m from "./_models";

import { updateItem } from "@/services";
import { itemUpdateSchema, YupError } from "@/schemas";

async function handleSubmit(
  state: m.InitialStateEntries,
  formData: FormData
): Promise<m.InitialStateEntries> {
  try {
    const data = Object.fromEntries(
      formData.entries()
    ) as m.ItemUpdateFormEntries;

    const payload = {
      id: parseInt(state.fieldValues.id),
      sku: data.sku,
      size: parseInt(data.size),
      price: parseFloat(data.price),
      shoeId: parseInt(state.fieldValues.shoeId),
    };

    const result = await itemUpdateSchema.validate(payload);
    await updateItem(result);

    return {
      message: "success",
      fieldValues: data,
    };
  } catch (err) {
    let message = "";

    if (err instanceof YupError) message = err.message;

    if (axios.isAxiosError(err))
      message = "Houve um erro ao processar a solicitação";

    return {
      ...state,
      message,
    };
  }
}

export { handleSubmit };

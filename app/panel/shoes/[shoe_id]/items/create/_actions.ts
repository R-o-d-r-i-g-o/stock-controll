"use server";

import axios from "axios";
import * as m from "./_models";

import { createItem } from "@/services";
import { itemCreationSchema, YupError } from "@/schemas";

async function handleSubmit(
  state: m.InitialStateEntries,
  formData: FormData
): Promise<m.InitialStateEntries> {
  try {
    const data = Object.fromEntries(
      formData.entries()
    ) as m.CreateUserFormEntries;

    const payload = {
      sku: data.sku,
      size: parseInt(data.size),
      price: parseFloat(data.price),
      shoeId: parseInt(state.fieldValues.shoeId),
    };

    const result = await itemCreationSchema.validate(payload);
    await createItem(result);

    return {
      message: "success",
      fieldValues: data,
    };
  } catch (err) {
    let message = "";

    if (err instanceof YupError) message = err.errors[0];

    if (axios.isAxiosError(err))
      message = "Houve um erro ao processar a solicitação";

    return {
      ...m.initalState,
      message,
    };
  }
}

export { handleSubmit };

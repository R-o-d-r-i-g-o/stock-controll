"use server"

import { ValidationError } from 'yup';
import * as m from './_types'
import axios from 'axios';

import { updateCategoryValdiationSchema } from '@/schemas'
import * as svc from '@/services'

async function handleEditCategorySubmit(state: m.InitialStateEntries, formData: FormData): Promise<m.InitialStateEntries> {
  try {
    const data = Object.fromEntries(formData.entries()) as m.CreateUserFormEntries
    const payload = {
      ...data,
      id: parseInt(state.fieldValues.id, 10)
    }

    const result = await updateCategoryValdiationSchema.validate(payload, { abortEarly: false });
    await svc.updateCategory(result)

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
      ...state,
      message
    }
  }
}

export { handleEditCategorySubmit }
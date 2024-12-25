import * as Yup from "yup";

import { ValidationError } from 'yup';

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Por favor, insira um email válido.")
    .required("O email é obrigatório."),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .required("A senha é obrigatória."),
});

const createUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome pode ter no máximo 100 caracteres')
    .required('Nome é obrigatório'),

  email: Yup.string()
    .email('Email deve ser válido')
    .required('Email é obrigatório'),

  role_id: Yup.number()
    .integer('Role ID deve ser um número inteiro')
    .positive('Role ID deve ser um número positivo')
    .required('Role ID é obrigatório'),

  password: Yup.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha pode ter no máximo 50 caracteres')
    .required('Senha é obrigatória'),
});

export {
  loginSchema,
  createUserSchema,
  ValidationError,
}
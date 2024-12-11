import * as Yup from "yup";

const loginSchema = Yup.object({
    email: Yup.string()
        .email("Por favor, insira um email válido.")
        .required("O email é obrigatório."),
    password: Yup.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres.")
        .required("A senha é obrigatória."),
});

export { loginSchema }
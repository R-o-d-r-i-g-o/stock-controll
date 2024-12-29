import bcrypt from "bcryptjs";

// Encrypts a plaintext password using bcrypt.
const encryptPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criptografar a senha");
  }
};

// Compares a plaintext password with a hashed password.
const comparePasswords = async (password: string, hashedPassword: string) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao comparar as senhas");
  }
};

const hashHelper = () => ({ comparePasswords, encryptPassword });

export { hashHelper };

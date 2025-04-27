import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXTAUTH_SECRET!;

type AuthSession = {
  id: number;
  name: string;
  email: string;
};

type AuthService = {
  generateToken(usr: AuthSession): string;
  verifyToken(token: string): AuthSession;
};

const authService = {} as AuthService;

authService.generateToken = (usr) => {
  return jwt.sign(usr, SECRET_KEY, {
    expiresIn: "8h",
  });
};

authService.verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY) as AuthSession;
};

export default authService;

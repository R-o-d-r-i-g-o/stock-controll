import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

const isServerSide = () => !!process.env.IS_SERVER_FLAG;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { isServerSide };

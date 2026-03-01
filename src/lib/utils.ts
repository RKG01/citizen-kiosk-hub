import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskPhoneDisplay(input: string, fallbackSuffix = "645") {
  const digits = (input ?? "").replace(/\D/g, "");
  const suffix = (digits.slice(-3) || fallbackSuffix).padStart(3, "0");
  return `xxxxx xxx${suffix}`;
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateString = (str: string, slice?: number) => {
	return str.slice(0, slice || 30) + "...";
};

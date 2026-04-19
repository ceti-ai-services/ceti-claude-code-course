import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class strings, de-duplicating conflicting utilities.
 * Every shadcn-vue component imports this via the `@/lib/utils` alias.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

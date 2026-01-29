/**
 * Utilidades compartidas (clases CSS, etc.).
 * DEV: Este archivo se usa en toda la app; no eliminar cn() sin revisar imports.
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import type { ToastType } from 'vue3-toastify'
import { toast } from 'vue3-toastify'

/**
 * Displays a toast notification with the given message and type.
 *
 * @param type - The type of toast notification to display.
 * @param message - The message to display in the toast notification.
 */
export function useToast(type: ToastType, message: string): void {
  toast(message, { type })
}

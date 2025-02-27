import type { ToastType } from 'vue3-toastify'
import { toast } from 'vue3-toastify'

export function useToast(type: ToastType, message: string): void {
  toast(message, { type })
}

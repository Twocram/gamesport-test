import { onMounted, onUnmounted } from 'vue'

export function useHandleKeydown(key: string, fn: () => void) {
  onMounted(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === key) {
        fn()
      }
    })
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', fn)
  })
}

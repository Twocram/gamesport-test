import { onMounted, onUnmounted } from 'vue'

/**
 * Composable function to handle keydown event and call a function when a specified key is pressed.
 * @param key - the key to listen for
 * @param fn - the function to call when the key is pressed
 */
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

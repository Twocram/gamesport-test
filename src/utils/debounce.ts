/**
 * Debounce function.
 *
 * @param fn - The function to debounce.
 * @param ms - The delay in milliseconds.
 * @returns A debounced version of the function.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }
}

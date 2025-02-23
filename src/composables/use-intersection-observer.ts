import { ref, onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Composable function for observing the intersection of an element with the viewport.
 *
 * @param target - element to observe
 * @param options - options for IntersectionObserver
 * @returns object with reactive isIntersecting property
 */
export function useIntersectionObserver(
    target: Ref<HTMLElement | null>,
    options?: IntersectionObserverInit
) {
    const isIntersecting = ref(false);

    let observer: IntersectionObserver | null = null;

    onMounted(() => {
        if (!target.value) return;
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                isIntersecting.value = entry.isIntersecting;
            });
        }, options);

        observer.observe(target.value);
    });

    onUnmounted(() => {
        if (observer && target.value) {
            observer.unobserve(target.value);
            observer.disconnect();
        }
    });

    return {
        isIntersecting,
    };
}
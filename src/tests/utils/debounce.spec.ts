import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { debounce } from '@/utils/debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls the function only once after the delay', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('does not call the function if the delay is not completed', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();

    vi.advanceTimersByTime(50);

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('calls the function with the correct context (this)', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    const context = { value: 42 };

    debouncedFn.call(context);

    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith();
    expect(mockFn.mock.instances[0]).toBe(context);
  });

  it('calls the function with the correct arguments', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn(1, 2, 3);

    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith(1, 2, 3);
  });

  it('resets the timer on subsequent calls', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    vi.advanceTimersByTime(50);

    debouncedFn();
    vi.advanceTimersByTime(50);

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
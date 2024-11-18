export default (func: (...args: unknown[]) => unknown, delay: number) => {
  let timeout: number | null = null;
  return (...args: unknown[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      func(...args);
    }, delay);
  };
};

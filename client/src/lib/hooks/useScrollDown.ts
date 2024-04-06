import { useEffect } from "react";

export function useScrollDown<T extends Element>(
  elementRef: React.RefObject<T>,
  deps: readonly unknown[]
): void {
  useEffect(() => {
      elementRef.current?.scroll({ top: elementRef.current.scrollHeight });
  }, deps);
}
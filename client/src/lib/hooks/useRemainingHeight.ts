import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

export function useRemainingHeight<T extends Element>(elementRef: React.RefObject<T>, deps?: unknown[]): number {
  const [elHeight, setElHeight] = useState<number>(0);
  const { height } = useWindowSize();

  useEffect(() => {
    const el = elementRef.current;
    if (el && height) {
      setElHeight(height - (el.getBoundingClientRect().top - document.body.getBoundingClientRect().top));
    }
  }, [elementRef.current, height, ...(deps ?? [])]);

  return elHeight;
}

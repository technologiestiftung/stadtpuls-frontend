import { useEffect, useRef } from "react";

export function usePrevious<ValueType>(
  value: ValueType
): ValueType | undefined {
  const ref = useRef<ValueType>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

import { forwardRef, useEffect, useRef } from "react";
import { TableToggleCommonProps } from "react-table";

export const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  TableToggleCommonProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef<HTMLInputElement>(null);
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    if (!resolvedRef || !("current" in resolvedRef) || !resolvedRef?.current)
      return;
    resolvedRef.current.indeterminate = !!indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input
        type='checkbox'
        ref={resolvedRef}
        {...rest}
        className='m-0 -translate-y-0.5'
      />
    </>
  );
});

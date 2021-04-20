import { forwardRef, HTMLProps } from "react";

interface ThProps extends HTMLProps<HTMLTableHeaderCellElement> {
  p?: string;
}
interface TdProps extends HTMLProps<HTMLTableCellElement> {
  p?: string;
}
interface TrProps extends HTMLProps<HTMLTableRowElement> {
  p?: string;
}

// eslint-disable-next-line react/display-name
export const Tr = forwardRef<HTMLTableRowElement, TrProps>(
  ({ children, className = "", p = "py-4 sm:py-0", ...rest }, ref) => (
    <tr
      ref={ref}
      className={[
        className,
        p,
        commonStyles,
        `grid gap-2 sm:gap-0 sm:table-row`,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </tr>
  )
);

const commonStyles = `whitespace-nowrap w-auto block align-top sm:table-cell`;
// eslint-disable-next-line react/display-name
export const Th = forwardRef<HTMLTableHeaderCellElement, ThProps>(
  ({ children, className = "", p = "sm:py-3 sm:pr-3", ...rest }, ref) => (
    <th
      ref={ref}
      className={[
        className,
        p,
        commonStyles,
        `text-gray-400 hidden sm:visible font-normal`,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </th>
  )
);

// eslint-disable-next-line react/display-name
export const Td = forwardRef<HTMLTableCellElement, TdProps>(
  (
    { children, className = "", p = "sm:py-3 pl-8 sm:pl-0 sm:pr-6", ...rest },
    ref
  ) => (
    <td
      ref={ref}
      className={[className, p, commonStyles, `font-normal`]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </td>
  )
);

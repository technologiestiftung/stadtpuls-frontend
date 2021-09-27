import useClickOutside from "@lib/hooks/useClickOutside";
import { FC, ReactNode } from "react";

interface SmallModalPropType {
  title: string;
  className?: string;
  variant?: "dangerous" | "primary";
  footerContent?: ReactNode;
  onClickOutside?: () => void;
}

export const SmallModal: FC<SmallModalPropType> = ({
  title,
  children,
  footerContent,
  variant,
  className = "max-w-md",
  onClickOutside = () => undefined,
}) => {
  const ref = useClickOutside<HTMLDivElement>(onClickOutside);
  return (
    <div ref={ref} className={`${className} md:px-0 h-full overflow-y-auto`}>
      <div
        className='bg-white border border-gray-200 shadow p-4 sm:p-8 flex flex-col gap-8 place-content-between'
        style={{ minHeight: 360 }}
      >
        <div>
          <h1
            className={`text-3xl font-bold font-headline m-0 mb-4 ${
              variant == "dangerous" ? "text-error-500" : "text-purple"
            }`}
          >
            {title}
          </h1>
          {children}
        </div>
        {footerContent && (
          <div className='flex gap-4 place-content-between'>
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

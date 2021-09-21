import { ReactNode, useState, useEffect, forwardRef } from "react";
import { Listbox } from "@headlessui/react";
import ChevronDownIcon from "../../../public/images/icons/16px/chevronDown.svg";
import CheckmarkIcon from "../../../public/images/icons/16px/checkmark.svg";

export interface SelectOptionType {
  name: ReactNode;
  value: string | number;
  disabled?: boolean;
}

interface FormListBoxPropType {
  name: string;
  label?: ReactNode;
  placeholder?: string;
  className?: string;
  options: SelectOptionType[];
  errors?: string[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (name: string | number | undefined) => void;
  containsIconList?: boolean;
}

// eslint-disable-next-line react/display-name
export const FormListBox = forwardRef<HTMLButtonElement, FormListBoxPropType>(
  (
    {
      label,
      options,
      placeholder = "Bitte wähle eine Option",
      className = "",
      errors = [],
      value,
      defaultValue,
      onChange = () => undefined,
      containsIconList = false,
    },
    ref
  ) => {
    const [selectValue, setSelectValue] = useState<string | number | undefined>(
      value || defaultValue
    );

    useEffect(() => {
      value && setSelectValue(value);
    }, [value]);

    const selectValueObject = options.find(
      ({ value: val }) => val === selectValue
    );

    return (
      <div className={`${className} mb-2 relative`}>
        <Listbox
          value={options.find(({ value }) => value === selectValue)}
          onChange={newVal => {
            if (typeof onChange === "function") onChange(newVal?.value);
            setSelectValue(newVal?.value);
          }}
        >
          {label && (
            <Listbox.Label className='block mb-2 cursor-pointer transition hover:opacity-60'>
              {label}
            </Listbox.Label>
          )}
          <Listbox.Button
            ref={ref}
            className={[
              "group flex items-center content-center",
              "px-3 py-2 border bg-white pr-8",
              "font-headline block w-full text-left relative",
              "focus:outline-none focus:border-purple focus:ring-2 focus:ring-green",
              !selectValue && placeholder && "text-gray-500",
              selectValue && "text-black hover:text-blue",
              errors.length > 0 ? "border-error" : "border-gray-200",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className='whitespace-nowrap truncate'>
              {!selectValue && placeholder && placeholder}
              {selectValueObject?.name}
            </span>
            <span className='absolute inset-y-0 right-3 flex items-center pointer-events-none'>
              <ChevronDownIcon />
            </span>
          </Listbox.Button>
          <Listbox.Options
            className={[
              containsIconList && "flex flex-wrap right-0 min-w-[200px]",
              "absolute z-10 mt-[-1px] w-full bg-white shadow",
              "max-h-56 text-base border border-gray-200",
              "overflow-y-auto focus:outline-none sm:text-sm",
            ].join(" ")}
          >
            {options.map(option => (
              <Listbox.Option
                key={`${option.value}`}
                value={option}
                disabled={option.disabled}
                className={({ active: hovered, selected, disabled }) =>
                  [
                    containsIconList ? "inline-block flex-grow pr-3" : "pr-9",
                    selected &&
                      !disabled &&
                      "text-blue font-bold cursor-default",
                    hovered &&
                      !selected &&
                      !disabled &&
                      "text-purple bg-purple bg-opacity-5 cursor-pointer",
                    disabled && "text-gray-700 bg-gray-50",
                    "select-none relative py-2 pl-3",
                    "border-t border-gray-100 first:border-none",
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                {({ selected }) => (
                  <>
                    {option.name}
                    {selected && (
                      <span
                        className={[
                          "absolute w-5 h-5 text-green",
                          "rounded-full",
                          containsIconList &&
                            "transform bottom-0 right-0 bg-blue",
                          containsIconList &&
                            "flex place-items-center place-content-center",
                          containsIconList &&
                            "flex place-items-center place-content-center",
                          !containsIconList && "bg-white right-3",
                        ].join(" ")}
                      >
                        <CheckmarkIcon />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        {errors.length > 0 && (
          <div className='mt-2'>
            {errors.map(error => (
              <p className='text-error text-sm' key={error}>
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

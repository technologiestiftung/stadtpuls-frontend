import { FC } from "react";
import { RadioTabsType, RadioTabOptionType } from "@common/interfaces";

export const RadioTabs: FC<RadioTabsType> = ({
  name,
  options,
  changeHandler,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    changeHandler(Number(event.target.value));
  };

  return (
    <div>
      {options.map((option: RadioTabOptionType) => {
        return (
          <div key={`${name}-${option.id}-tab`} className='inline-block mr-3'>
            <input
              type='radio'
              id={`${name}-${option.id}`}
              name={name}
              value={option.id}
              checked={option.isActive}
              onChange={handleChange}
              className='opacity-0 absolute pointer-events-none'
            />
            <label
              htmlFor={`${name}-${option.id}`}
              className={[
                "cursor-pointer",
                "transition-all",
                `${option.isActive ? "text-blue" : "text-gray-500"}`,
              ].join(" ")}
            >
              {option.title}
            </label>
          </div>
        );
      })}
    </div>
  );
};

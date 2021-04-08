/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, Box, Theme } from "theme-ui";
import { RadioTabsType, RadioTabOptionType } from "@common/interfaces";

export const RadioTabs: React.FC<RadioTabsType> = ({
  name,
  options,
  changeHandler,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    changeHandler(Number(event.target.value));
  };

  return (
    <Box>
      {options.map((option: RadioTabOptionType) => {
        return (
          <div
            key={`${name}-${option.id}-tab`}
            sx={{
              display: "inline-block",
              marginRight: (theme: Theme) =>
                `${String((theme?.space || [])[3])}px`,
            }}
          >
            <input
              type='radio'
              id={`${name}-${option.id}`}
              name={name}
              value={option.id}
              checked={option.isActive}
              onChange={handleChange}
              sx={{
                opacity: 0,
                position: "absolute",
                pointerEvents: "none",
              }}
            />
            <label
              htmlFor={`${name}-${option.id}`}
              sx={{
                color: option.isActive ? "primary" : "lightgrey",
                cursor: "pointer",
                transition: "all .1s ease-in-out",
                "&:hover": {
                  color: "primary",
                },
              }}
            >
              {option.title}
            </label>
          </div>
        );
      })}
    </Box>
  );
};

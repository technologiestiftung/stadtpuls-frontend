/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, Box, Button, Image } from "theme-ui";
interface IconButtonType {
  value: string;
  iconSource: string;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

export const IconButton: React.FC<IconButtonType> = ({
  value,
  iconSource,
  clickHandler,
}) => {
  return (
    <Button
      variant='text'
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "left",
      }}
      onClick={clickHandler}
    >
      <Box
        bg='secondary'
        mr={2}
        sx={{
          display: "inline-block",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
        }}
      >
        <Image
          src={iconSource}
          alt='Download-Icon'
          sx={{ width: "100%", height: "100%", flex: "1 0 0" }}
        />
      </Box>
      {value}
    </Button>
  );
};

import { Controller } from "react-hook-form";
import React from "react";
import { Checkbox } from "@mui/material/index";
import { styled } from "@mui/system";
import { theme } from "../../theme";
const InputCheckbox = ({ name, control, defaultValue, data }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <ContainerCheckbox>
          <input hidden type="checkbox" value={value} name={name} id={name} onChange={onChange} />
          <Label
            htmlFor={name}
            style={
              value
                ? { color: theme.palette.white.main, backgroundColor: theme.palette.primary.main }
                : {
                    color: "#a0a0a0",
                    backgroundColor: "#f0f0f0"
                  }
            }>
            {name}
          </Label>
        </ContainerCheckbox>
      )}
    />
  );
};

const ContainerCheckbox = styled("div")`
  margin: 10px 10px 10px 0;
`;
const Label = styled("label")(({ theme }) => ({
  padding: "10px 20px",
  // color: theme.palette.white.main,
  // backgroundColor: theme.palette.primary.main,
  borderRadius: 10
}));

export default InputCheckbox;

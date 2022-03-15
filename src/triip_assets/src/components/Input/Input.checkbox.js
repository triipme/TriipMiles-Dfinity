import { Controller } from "react-hook-form";
import React from "react";
import { Checkbox, Typography } from "@mui/material/index";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
export const InputCheckboxLabel = ({ name, control, defaultValue, data }) => {
  const theme = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <ContainerCheckbox>
          <input hidden type="checkbox" value={value} name={name} id={name} onChange={onChange} />
          <Label
            component="label"
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

export const InputCheckbox = ({ name, control, defaultValue }) => {
  const theme = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => <Checkbox checked={value} onChange={onChange} />}
    />
  );
};

const ContainerCheckbox = styled("div")`
  margin: 10px 10px 10px 0;
`;
const Label = styled(Typography)(({ theme }) => ({
  padding: "10px 20px",
  // color: theme.palette.white.main,
  // backgroundColor: theme.palette.primary.main,
  borderRadius: 10
}));

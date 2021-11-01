import { Controller } from "react-hook-form";
import React from "react";
import { styled } from "@mui/system";
import Switch from "@mui/material/Switch";

const InputSwitch = ({ name, control, defaultValue, data, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value = false, onChange } }) => (
        <ContainerSwitch>
          <Switch checked={value} onChange={onChange} />
        </ContainerSwitch>
      )}
    />
  );
};

const ContainerSwitch = styled("div")`
  display: inline;
  margin-bottom: 15px;
`;

export default InputSwitch;

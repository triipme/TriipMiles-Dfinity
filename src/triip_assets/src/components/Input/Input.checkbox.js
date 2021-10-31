import { Controller } from "react-hook-form";
import React from "react";
import { Checkbox } from "@mui/material/index";
import { styled } from "@mui/system";
const InputCheckbox = ({ name, control, defaultValue, data }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <ContainerCheckbox>
          <input type="checkbox" value={value} name={name} id={name} onChange={onChange} />
          <label htmlFor={name}>{name}</label>
        </ContainerCheckbox>
      )}
    />
  );
};

const ContainerCheckbox = styled("div")`
  margin-bottom: 15px;
`;

export default InputCheckbox;

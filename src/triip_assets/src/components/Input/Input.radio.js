import { Controller } from "react-hook-form";
import React from "react";
import { Radio } from "@mui/material/index";
import { styled } from "@mui/system";
const InputRadio = ({ name, control, defaultValue, data }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <ContainerRadio>
          {data.map((item, index) => (
            <div id={item} key={index}>
              <Radio checked={value === item} value={item} onChange={onChange} />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </ContainerRadio>
      )}
    />
  );
};

const ContainerRadio = styled("div")`
  margin-bottom: 15px;
`;

export default InputRadio;

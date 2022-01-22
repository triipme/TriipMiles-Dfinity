import { Controller } from "react-hook-form";
import React from "react";
import { Radio, Typography } from "@mui/material/index";
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
              <Radio checked={item === (value || defaultValue)} value={item} onChange={onChange} />
              <Typography component="label" variant="body1" htmlFor={item}>
                {item}
              </Typography>
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

import React from "react";
import { TextField } from "@mui/material/index";
import { Controller } from "react-hook-form";
import { styled } from "@mui/system";

const InputText = ({ name, label, control, defaultValue = "", placeHolder, helperTextError }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: true
      }}
      render={({ field: { name, value = "", onChange }, fieldState: { error } }) => (
        <TextFieldStyled
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
          name={name}
          label={label}
          type="text"
          error={!!error}
          helperText={helperTextError[error?.type]}
        />
      )}
    />
  );
};

const TextFieldStyled = styled(TextField)`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 15px;
`;

export default InputText;

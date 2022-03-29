import React from "react";
import { TextField, Autocomplete } from "@mui/material/index";
import { Controller } from "react-hook-form";
import { styled } from "@mui/system";

const InputText = ({
  name,
  label,
  control,
  autocompleteOptions,
  defaultValue = "",
  placeHolder,
  helperTextError,
  helperTextErrorCustom,
  rules
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: true,
        ...rules
      }}
      render={({ field: { name, value, onChange }, fieldState: { error } }) => (
        <>
          {autocompleteOptions ? (
            <Autocomplete
              disablePortal
              options={autocompleteOptions ?? []}
              onInputChange={(evt, newValue) => onChange(newValue)}
              inputValue={value}
              renderInput={params => (
                <TextFieldStyled
                  {...params}
                  placeholder={placeHolder}
                  name={name}
                  label={label}
                  type="text"
                  error={!!error}
                  helperText={helperTextError[error?.type] ?? helperTextErrorCustom}
                />
              )}
            />
          ) : (
            <TextFieldStyled
              placeholder={placeHolder}
              name={name}
              label={label}
              onChange={onChange}
              value={value}
              type="text"
              error={!!error}
              helperText={helperTextError[error?.type] ?? helperTextErrorCustom}
            />
          )}
        </>
      )}
    />
  );
};

const TextFieldStyled = styled(TextField)`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default InputText;

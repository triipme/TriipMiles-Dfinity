import React from "react";
import { TextField, Autocomplete } from "@mui/material/index";
import { Controller } from "react-hook-form";
import { styled } from "@mui/system";
import { resizeImg } from "../../functions";
const InputFile = ({
  name,
  label,
  control,
  autocompleteOptions,
  defaultValue = "",
  rules,
  children,
  helperTextErrorCustom,
  ...rest
}) => {
  const readFile = (e, onChange) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async data => {
      const img = await resizeImg({ blob: e.target.files[0], asprX: 20, asprY: 20 });
      onChange({ file: img, preview: data.target.result });
    };
  };
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
          <Input onChange={e => readFile(e, onChange)} type="file" name={name} {...rest} />
          {children({ value, error })}
        </>
      )}
    />
  );
};

const Input = styled("input")`
  display: none;
`;

export default InputFile;

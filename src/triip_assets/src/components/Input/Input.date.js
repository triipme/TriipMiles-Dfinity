import { Controller } from "react-hook-form";
import React from "react";
import { styled } from "@mui/system";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
const InputDate = ({ name, control, defaultValue, data, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <ContainerDate>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              label={label}
              value={value}
              onChange={onChange}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
        </ContainerDate>
      )}
    />
  );
};

const ContainerDate = styled("div")`
  display: inline;
  margin-bottom: 15px;
`;

export default InputDate;

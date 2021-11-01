import { Controller } from "react-hook-form";
import React from "react";
import { styled } from "@mui/system";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";

const InputDate = ({ name, control, defaultValue, data, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <ContainerDate>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
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

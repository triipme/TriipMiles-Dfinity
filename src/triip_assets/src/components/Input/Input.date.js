import { Controller } from "react-hook-form";
import React from "react";
import { styled } from "@mui/system";
import { LocalizationProvider, DatePicker, MobileDatePicker, DesktopDatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const InputDate = ({ name, control, defaultValue, data, label }) => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <ContainerDate>
          <LocalizationProvider dateAdapter={DateAdapter}>
            {isSM ? (
              <DesktopDatePicker
                label={label}
                value={value}
                onChange={onChange}
                renderInput={params => <TextField {...params} />}
              />
            ) : (
              <MobileDatePicker
                label={label}
                value={value}
                onChange={onChange}
                renderInput={params => <TextField {...params} />}
              />
            )}
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

import React from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { ButtonPrimary, InputText } from "../../components";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const FormProfileStyled = styled("div")({});

const FormProfile = ({}) => {
  const {
    control,
    handleSubmit,
    formState: { error }
  } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <FormProfileStyled>
      <Typography sx={{ mb: 2 }} variant="h6">
        Create Profile
      </Typography>
      <InputText control={control} name="username" placeHolder="Username" />
      <ButtonPrimary title="Submit" onClick={handleSubmit(onSubmit)} />
    </FormProfileStyled>
  );
};

FormProfile.propTypes = {};

export default FormProfile;

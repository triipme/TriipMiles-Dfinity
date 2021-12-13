import React from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { ButtonPrimary, InputText } from "../../components";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ERRORS } from "../../utils/constants";

const FormProfileStyled = styled("div")({});

const FormProfile = ({ handleModalEvent }) => {
  const { actor } = useSelector(state => state.user);
  const {
    control,
    handleSubmit,
    formState: { error }
  } = useForm({ defaultValues: { username: [] } });
  const onSubmit = async data => {
    actor
      ?.create({ user: { username: [data.username] }, wallets: [[]] })
      .then(async result => {
        if ("ok" in result) {
          const profileUploaded = await actor?.read();
          if ("ok" in profileUploaded) {
            // Do nothing, we already updated
            handleModalEvent(false);
          } else {
            console.error(profile.err);
          }
        } else {
          console.error(result.err);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <FormProfileStyled>
      <Typography sx={{ mb: 2 }} variant="h6">
        Create Profile
      </Typography>
      <InputText
        control={control}
        name="username"
        placeHolder="Username"
        helperTextError={ERRORS}
      />
      <ButtonPrimary title="Submit" onClick={handleSubmit(onSubmit)} />
    </FormProfileStyled>
  );
};

FormProfile.propTypes = {};

export default FormProfile;

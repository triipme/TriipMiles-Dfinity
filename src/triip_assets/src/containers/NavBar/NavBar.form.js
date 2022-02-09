import React from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { ButtonPrimary, InputText } from "../../components";
import { styled, useTheme } from "@mui/system";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ERRORS } from "../../utils/constants";
import RosettaApi from "../../services/rosetta";
import toast from "react-hot-toast";
import { profile } from "../../slice/user/userSlice";

const FormProfileStyled = styled("div")({});
const rosettaApi = new RosettaApi();
const FormProfile = ({ handleModalEvent }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { actor } = useSelector(state => state.user);
  const {
    control,
    handleSubmit,
    setError,
    formState: { error, isSubmitting }
  } = useForm({ defaultValues: { username: [], wallets: [] } });
  const onSubmit = async data => {
    try {
      await rosettaApi.accountBalanceByAddress(data?.wallets);
      const result = await actor?.create({
        user: { username: [data.username] },
        wallets: [[data?.wallets]]
      });
      if ("ok" in result) {
        const profileUploaded = await actor?.read();
        if ("ok" in profileUploaded) {
          // Do nothing, we already updated
          dispatch(profile({ ...profileUploaded?.ok[0], _id: profileUploaded?.ok[1] }));
          handleModalEvent(false);
        } else {
          throw profile.err;
        }
      } else {
        throw result.err;
      }
    } catch (error) {
      if (error?.message === "Request failed with status code 500") {
        setError("wallets", {
          type: "pattern",
          message: "Address Not Found!"
        });
      }
      toast.error(
        {
          "NotFound": "Create Information Failed !."
        }[Object.keys(error)[0]]
      );
    }
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
        label="Username"
        helperTextError={ERRORS}
      />
      <InputText
        control={control}
        name="wallets"
        label="Address ICP Wallet"
        placeHolder="Enter Address Wallet"
        helperTextError={ERRORS}
        rules={{
          pattern: /^[a-zA-Z0-9]/
        }}
      />
      <Typography variant="caption" mb={2} color={theme.palette.grey[500]}>
        Triip ICP will transfer to this wallet for features.
      </Typography>
      <ButtonPrimary loading={isSubmitting} title="Submit" onClick={handleSubmit(onSubmit)} />
    </FormProfileStyled>
  );
};

FormProfile.propTypes = {};

export default FormProfile;

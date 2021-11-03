import React from "react";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ButtonStyled = styled(LoadingButton)(({ theme }) => ({
  width: "100%"
}));

const ButtonPrimary = ({ title, onClick, variant = "primary", sx, loading = false }) => {
  return (
    <>
      <ButtonStyled loading={loading} variant={variant} sx={sx} onClick={onClick}>
        {title}
      </ButtonStyled>
    </>
  );
};

export default ButtonPrimary;

import React from "react";
import { styled } from "@mui/system";
import { Button } from "@mui/material";

const ButtonStyled = styled(Button)(({ theme }) => ({}));

const ButtonPrimary = ({ title, onClick, variant = "primary" }) => {
  return (
    <ButtonStyled variant={variant} onClick={onClick}>
      {title}
    </ButtonStyled>
  );
};

export default ButtonPrimary;

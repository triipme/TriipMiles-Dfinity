import React from "react";

export const Button = ({ title, onClick }) => {
  return <ButtonStyled onClick={onClick}>{title}</ButtonStyled>;
};

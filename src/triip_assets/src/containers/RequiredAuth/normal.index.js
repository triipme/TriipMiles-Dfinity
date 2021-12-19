import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NormalRequiredAuth = ({ children }) => {
  const { isLogin } = useSelector(state => state.user);
  const navigate = useNavigate();
  if (!isLogin) {
    navigate("/");
  }
  return <>{children}</>;
};

export default NormalRequiredAuth;

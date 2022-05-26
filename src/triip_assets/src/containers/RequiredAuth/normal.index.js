import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NormalRequiredAuth = ({ children }) => {
  const { isLogin } = useSelector(state => state.user);
  const navigate = useNavigate();
  if (!isLogin) {
    toast.error("You need to login first.", {
      duration: 3000
    });
    navigate("/");
  }
  return <>{children}</>;
};

export default NormalRequiredAuth;

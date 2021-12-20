import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route, Navigate } from "react-router-dom";

const AdminRequiredAuth = ({ children, ...rest }) => {
  console.log("cc");
  const { actor } = useSelector(state => state.user);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  // (async () => {
  //   try {
  //     if (!!actor?.loginAdmin) {
  //       const rs = await actor?.loginAdmin();
  //       if ("err" in rs) {
  //         setIsAuth();
  //       } else {
  //         setIsAuth(true);
  //       }
  //     }
  //   } catch (error) {}
  // })();
  return <>{isAuth ? children : <Navigate to="/triip-admin/dashboard/register" />}</>;
};

export default AdminRequiredAuth;

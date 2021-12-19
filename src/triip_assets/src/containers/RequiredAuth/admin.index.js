import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminRequiredAuth = ({ children }) => {
  const { actor } = useSelector(state => state.user);
  const navigate = useNavigate();
  (async () => {
    try {
      if (!!actor?.loginAdmin) {
        const rs = await actor?.loginAdmin();
        if ("err" in rs) {
          navigate("/triip-admin/dashboard/register");
        }
      }
    } catch (error) {
      navigate("/triip-admin/dashboard/register");
    }
  })();
  return <>{children}</>;
};

export default AdminRequiredAuth;

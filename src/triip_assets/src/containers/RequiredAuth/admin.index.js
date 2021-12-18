import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminRequiredAuth = ({ children }) => {
  const { actor } = useSelector(state => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        if (!!actor?.loginAdmin) {
          const rs = await actor?.loginAdmin();
          if ("ok" in rs) {
            console.log(rs?.ok);
          } else {
            throw rs?.err;
          }
        }
      } catch (error) {
        navigate("/triip-admin/dashboard/register");
        console.log(error);
      }
    })();
  }, [actor]);
  return children;
};

export default AdminRequiredAuth;

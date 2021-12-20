import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRequiredAuth = ({ children }) => {
  const { actor } = useSelector(state => state.user);
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        if (!!actor?.loginAdmin) {
          const rs = await actor?.loginAdmin();
          if ("ok" in rs) {
            setIsAuth(true);
          } else {
            throw rs?.err;
          }
        }
      } catch (error) {
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <>{isLoading ? <></> : isAuth ? children : <Navigate to="/triip-admin/dashboard/register" />}</>
  );
};

export default AdminRequiredAuth;

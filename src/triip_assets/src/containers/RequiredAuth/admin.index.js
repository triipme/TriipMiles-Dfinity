import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { info } from "../../slice/admin/adminSlice";

const AdminRequiredAuth = ({ children }) => {
  const { actor } = useSelector(state => state.user);
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        if (!!actor?.loginAdmin) {
          const rs = await actor?.loginAdmin();
          if ("ok" in rs) {
            console.log(rs?.ok);
            dispatch(info(rs?.ok));
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

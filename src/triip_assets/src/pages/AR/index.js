import { Box, Button } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
const AR = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/ar" && (
        <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
          <Box sx={{ display: "flex" }}>
            <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate("/ar/embed/marker")}>
              Marker
            </Button>
            <Button variant="contained" onClick={() => navigate("/ar/embed/geolocation")}>
              GeoLocation
            </Button>
          </Box>
        </div>
      )}
      <Outlet />
    </>
  );
};
export default AR;

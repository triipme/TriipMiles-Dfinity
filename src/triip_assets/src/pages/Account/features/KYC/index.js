import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { ButtonPrimary } from "../../../../components";

const KYC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box>
      {location?.pathname !== "/account/kyc/verify" && (
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          p={3}
          boxShadow={theme.shadows[20]}
          borderRadius={2}>
          <Box>
            <Typography variant="body1" fontWeight="600">
              ID AUTHENTICATION
            </Typography>
            <Typography variant="caption">
              Provide us with your personal information and proof of identity
            </Typography>
          </Box>
          <Box>
            <ButtonPrimary title="VERIFY" onClick={() => navigate("/account/kyc/verify")} />
          </Box>
        </Stack>
      )}
      <Outlet />
    </Box>
  );
};

export default KYC;

import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router";
import { ButtonPrimary } from "../../../../components";
import { countryThunk, citizenshipsThunk } from "../../../../slice/static/staticSlice";

const KYC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [statusKYC, setStatusKYC] = useState();
  const { actor } = useSelector(state => state.user);
  async function KYC_status() {
    try {
      if (!!actor?.get_statusKYC) {
        const rs_status = await actor.get_statusKYC();
        if ("ok" in rs_status) {
          setStatusKYC(rs_status.ok[0]);
        } else {
          throw rs_status.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    KYC_status();
    dispatch(countryThunk());
    dispatch(citizenshipsThunk());
  }, []);
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
            <Typography variant="caption" mt={2}>
              {!!statusKYC
                ? {
                    new: "Your KYC information is being processed. Please check back the status after a frew hours",
                    waiting:
                      "Your KYC information is being processed. Please check back the status after a frew hours",
                    rejected: "Reason: ",
                    approved: "Thank you! Your KYC status has been approved"
                  }[statusKYC]
                : "Provide us with your personal information and proof of identity"}
            </Typography>
          </Box>
          {!["approved", "new", "waiting"].includes(statusKYC) && (
            <Box>
              <ButtonPrimary title="VERIFY" onClick={() => navigate("/account/kyc/verify")} />
            </Box>
          )}
        </Stack>
      )}
      <Outlet />
    </Box>
  );
};

export default KYC;

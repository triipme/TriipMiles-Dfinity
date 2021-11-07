import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { Images } from "../../theme";

const Footer = () => {
  return (
    <Box sx={{ my: 5 }}>
      <Grid container>
        <Grid item xs={4} textAlign="center">
          <img src={Images.logo} width={100} height={100} alt="" />
          <Typography variant="caption">
            <p style={{ marginBottom: 0 }}>© 2021 Triip Pte. Ltd.</p>
            <p style={{ marginTop: 0 }}>All rights reserved.</p>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body1" mb={3}>
                About Triip.me
              </Typography>
              <Typography fontWeight="400" variant="subtitle2">
                About Us
              </Typography>
              <Typography fontWeight="400" variant="subtitle2">
                Policies
              </Typography>
              <Typography fontWeight="400" variant="subtitle2">
                Contact
              </Typography>
              <Typography fontWeight="400" variant="subtitle2">
                Blog
              </Typography>
              <Typography fontWeight="400" variant="subtitle2">
                FAQs
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="end">
              <Typography variant="body1" mb={3}>
                Product
              </Typography>
              <Typography fontWeight="400" variant="subtitle2">
                Triip Stays
              </Typography>
              <Typography fontWeight="400" variant="subtitle2">
                Triip Experiences
              </Typography>
              <Typography fontWeight="400" variant="subtitle2">
                TriipMiiles
              </Typography>
              <Typography fontWeight="400" variant="subtitle2">
                Triip Shopping
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5} px={7}>
          <Typography align="center" variant="body1" mb={3}>
            Download Triip App
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box>
              <img src={Images.qr} width={150} alt="" />
            </Box>
            <Box px={3}>or</Box>
            <Box>
              <img style={{ marginBottom: 20 }} src={Images.appstore} alt="" />
              <img style={{ marginTop: 20 }} src={Images.googleplay} alt="" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;

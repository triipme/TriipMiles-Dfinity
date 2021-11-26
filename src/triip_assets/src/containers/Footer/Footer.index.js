import { Grid, Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Images } from "../../theme";

const Footer = () => {
  return (
    <Box sx={{ my: 5 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={4} textAlign="center">
          <Box component="img" src={Images.logo} maxWidth={100} maxHeight={100} alt="" />
          <Typography variant="caption">
            <p style={{ marginBottom: 0 }}>© 2021 Triip Pte. Ltd.</p>
            <p style={{ marginTop: 0 }}>All rights reserved.</p>
          </Typography>
        </Grid>
        <Grid item xs={12} lg={3} mt={{ xs: 5, md: 0 }} px={{ xs: 5, sm: 25, lg: 0 }}>
          <Grid container maxWidth="sm">
            <Grid item xs={6}>
              <Typography fontWeight="bold" variant="body1" mb={3}>
                About Triip.me
              </Typography>
              <LinkFooterStyled underline="none" href="https://www.triip.me/pages/about_us">
                <Typography fontWeight="400" variant="subtitle2">
                  About Us
                </Typography>
              </LinkFooterStyled>
              <LinkFooterStyled underline="none" href="https://www.triip.me/pages/terms_of_service">
                <Typography fontWeight="400" variant="subtitle2">
                  Policies
                </Typography>
              </LinkFooterStyled>
              <LinkFooterStyled underline="none" href="https://www.triip.me/pages/contact_us">
                <Typography fontWeight="400" variant="subtitle2">
                  Contact
                </Typography>
              </LinkFooterStyled>
              <LinkFooterStyled underline="none" href="https://share.triip.me/">
                <Typography fontWeight="400" variant="subtitle2">
                  Blog
                </Typography>
              </LinkFooterStyled>
              <LinkFooterStyled underline="none" href="https://www.triip.me/pages/faqs">
                <Typography fontWeight="400" variant="subtitle2">
                  FAQs
                </Typography>
              </LinkFooterStyled>
            </Grid>
            <Grid item xs={6} textAlign="end">
              <Typography fontWeight="bold" variant="body1" mb={3}>
                Product
              </Typography>
              <LinkFooterStyled underline="none" href="https://stay.triip.me/">
                <Typography fontWeight="400" variant="subtitle2">
                  Triip Stays
                </Typography>
              </LinkFooterStyled>
              <LinkFooterStyled underline="none" href="https://experience.triip.me/">
                <Typography fontWeight="400" variant="subtitle2">
                  Triip Experiences
                </Typography>
              </LinkFooterStyled>
              <LinkFooterStyled underline="none" href="https://triipmiles.com/">
                <Typography fontWeight="400" variant="subtitle2">
                  TriipMiiles
                </Typography>
              </LinkFooterStyled>
              <LinkFooterStyled underline="none" href="https://shopping.triip.me/">
                <Typography fontWeight="400" variant="subtitle2">
                  Triip Shopping
                </Typography>
              </LinkFooterStyled>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} lg={5} mt={{ xs: 5, md: 0 }}>
          <Typography align="center" variant="body1" mb={3}>
            Download Triip App
          </Typography>
          <Grid container direction="row" alignItems="center" justifyContent="center">
            <Grid item xs={4} md={4} sx={{ textAlign: "end" }}>
              <Grid container justifyItems="flex-end">
                <Box
                  component="img"
                  src={Images.qr}
                  maxHeight={{ xs: 100, sm: 150 }}
                  sx={{ objectFit: "cover" }}
                  alt=""
                />
              </Grid>
            </Grid>
            <Grid item xs={2} textAlign="center">
              <Box>or</Box>
            </Grid>
            <Grid item xs={4} md={5} alignItems="center" justifyContent="flex-start">
              <Box
                component="img"
                maxWidth="100%"
                sx={{ objectFit: "cover" }}
                src={Images.appstore}
                alt=""
                mb={1}
              />
              <Box
                component="img"
                maxWidth="100%"
                sx={{ objectFit: "cover" }}
                src={Images.googleplay}
                alt=""
                mt={1}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const LinkFooterStyled = styled(Link)(({ theme }) => ({
  color: "#808080",
  "&:hover": {
    color: theme.palette.primary.main
  }
}));

export default Footer;

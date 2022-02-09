import React, { useEffect, useState } from "react";
// material
import { Box, Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from "../components/_dashboard/app";
import { useSelector } from "react-redux";
import Label from "../components/Label";
import RosettaApi from "../../../services/rosetta";
// ----------------------------------------------------------------------
const rossetaApi = new RosettaApi();
export default function DashboardApp() {
  const { actor, actor_transfer } = useSelector(state => state.user);
  const [analysis, setAnalysis] = useState(null);
  const [wallet, setWallet] = useState(null);
  const aId = "1258F4461440E1149DD1B42A9D566B82EA46014BEF1FBCD2D67124B7496FA477";
  useEffect(() => {
    (async () => {
      try {
        if (!!actor?.analysis) {
          const rs = await actor?.analysis();
          if (rs?.ok) setAnalysis(rs?.ok);
          else throw rs?.err;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const balance = await rossetaApi.accountBalanceByAddress(aId);
        console.log(balance);
        setWallet(Number(balance?.balances[0].value) / 1e8);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item sm={12} justifyContent="center">
            <Box py={10}>
              <Typography variant="h1" align="center">
                {wallet || 0} ICP
                {wallet && (
                  <Label color={wallet < 0.1 ? "error" : wallet < 1 ? "warning" : "success"}>
                    {wallet < 0.1 ? "error" : wallet < 1 ? "warning" : "success"}
                  </Label>
                )}
              </Typography>
              <Typography variant="subtitle1" align="center">
                {aId ?? 0}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales total={analysis?.at(0).travelplans} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers total={analysis?.at(0).profiles} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders total={analysis?.at(0).proofs_approved} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports total={analysis?.at(0).proofs_rejected} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates data={analysis?.at(1)} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits data={analysis?.at(1)} />
          </Grid>

          <Grid item xs={12}>
            <AppWebsiteVisits />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

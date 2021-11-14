import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TravelPlans = () => {
  const { actor } = useSelector(state => state.user);
  const [tps, setTps] = useState([]);
  useEffect(() => {
    (async () => {
      if (!!actor) {
        const rs = await actor?.readAllTPUser();
        setTps(rs.ok);
      }
    })();
  }, [actor]);
  console.log(tps);
  return (
    <Grid container spacing={3}>
      {tps?.map((tp, intp) => (
        <TravelPlanItem key={intp} tp={tp?.travel_plan} />
      ))}
    </Grid>
  );
};

const TravelPlanItem = ({ tp }) => {
  return (
    <Grid item xs={3}>
      <Box sx={{ position: "relative", borderRadius: "16px", boxShadow: "0 0 50px 5px #f2f2f2" }}>
        <TPImg src={tp.img} alt="" />
        <TPBody>
          <Typography variant="caption">
            {moment.unix(tp.timeStart).format("DD-MM-YYYY").toString()}
            {" - "}
            {moment.unix(tp.timeEnd).format("DD-MM-YYYY").toString()}
          </Typography>
          <br />
          <Typography fontWeight="bold" variant="caption">
            Proof of travel - New
          </Typography>
        </TPBody>
        <TPName>
          <Typography fontWeight="bold" variant="body2">
            CC
          </Typography>
        </TPName>
      </Box>
    </Grid>
  );
};

const TPImg = styled("img")`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 16px;
`;
const TPBody = styled("div")`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 80px;
  padding: 10px 15px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  background-color: #fff;
`;
const TPName = styled("div")`
  position: absolute;
  width: 100%;
  height: 170px;
  bottom: 80px;
  padding: 10px 15px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.5) inset, 0px -10px 50px rgba(0, 0, 0, 0.5) inset;
  color: #fff;
  display: flex;
  align-items: flex-end;
`;

export default TravelPlans;

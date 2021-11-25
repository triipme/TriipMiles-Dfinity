import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetFile } from "../../../hooks";

const TravelPlans = () => {
  const { actor } = useSelector(state => state.user);
  const [tps, setTps] = useState([]);
  // const [fileUrl, setNameFile] = useGetFile();
  // console.log(fileUrl);
  useEffect(() => {
    (async () => {
      if (!!actor.readAllTPUser) {
        const rs = await actor?.readAllTPUser();
        setTps(rs.ok);
      }
    })();
  }, [actor]);
  useEffect(() => {
    console.log(tps?.map(itps => ({ ...itps, url: itps?.travel_plan?.img })));
    // setNameFile("");
  }, [tps]);
  return (
    <Grid container spacing={3} justifyContent="center">
      {tps?.map((tp, intp) => (
        <TravelPlanItem key={intp} tp={tp?.travel_plan} />
      ))}
    </Grid>
  );
};

const TravelPlanItem = ({ tp }) => {
  return (
    <Grid item xs={9} sm={6} md={4} lg={3}>
      <Box sx={{ borderRadius: "16px", boxShadow: "0 0 50px 5px #f2f2f2" }}>
        <Box height={150} position="relative">
          <TPImg src={""} alt="" />
          <TPName>
            <Typography fontWeight="bold" variant="body2">
              {tp?.destination}
            </Typography>
          </TPName>
        </Box>
        <TPBody>
          <Typography variant="body1">
            {moment.unix(tp?.timeStart).format("DD-MM-YYYY").toString()}
            {" - "}
            {moment.unix(tp?.timeEnd).format("DD-MM-YYYY").toString()}
          </Typography>
          <Typography fontWeight="bold" variant="body2">
            Proof of travel - New
          </Typography>
        </TPBody>
      </Box>
    </Grid>
  );
};

const TPImg = styled("img")`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;
const TPBody = styled("div")`
  /* position: absolute; */
  width: 100%;
  bottom: 0;
  /* height: 80px; */
  padding: 10px 15px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  background-color: #fff;
`;
const TPName = styled("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  /* height: 170px; */
  /* bottom: 80px; */
  padding: 0 15px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0px 10px 50px rgba(41, 22, 22, 0.5) inset, 0px -10px 50px rgba(0, 0, 0, 0.5) inset;
  color: #fff;
  display: flex;
  align-items: flex-end;
`;

export default TravelPlans;

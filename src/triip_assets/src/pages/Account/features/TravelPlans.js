import { Grid, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetFile } from "../../../hooks";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";

const TravelPlans = () => {
  const { actor } = useSelector(state => state.user);
  const [tps, setTps] = useState([]);
  // const [fileUrl, setNameFile] = useGetFile();
  // console.log(fileUrl);
  useEffect(() => {
    (async () => {
      if (!!actor.readAllTPUser) {
        const rs = await actor?.readAllTPUser();
        console.log(rs)
        setTps(rs.ok);
      }
    })();
  }, [actor]);
  return (
    <Grid container spacing={3} justifyContent={{ xs: "center", sm: "flex-start" }}>
      {tps?.map((tp, intp) => (
        <TravelPlanItem key={intp} idtp={tp?.idtp} tp={tp?.travel_plan} />
      ))}
    </Grid>
  );
};

const TravelPlanItem = ({ idtp,tp }) => {
  const navigate = useNavigate()
  console.log(idtp)
  const theme = useTheme();
  return (
    <Grid item xs={9} sm={6} md={4} lg={3} onClick={()=>navigate(`/account/travelplans/${tp?.id}`)}>
      <Box  sx={{ borderRadius: "16px", boxShadow: theme.shadows[18] }}>
        <Box position="relative">
          <TPImg
            src={
              tp.img[0] ??
              `https://source.unsplash.com/random/${tp?.created_at}?${tp?.destination[0]
                .split(" ")
                .join("")}`
            }
            alt=""
          />
          <TPName>
            <Typography fontWeight="bold" variant="body1" mb={2}>
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

const TPImg = styled("img")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    maxHeight: 150,
    minHeight: 150
  },
  minHeight: 200,
  maxWidth: "100%",
  objectFit: "cover",
  objectPosition: "center",
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16
}));
const TPBody = styled("div")`
  /* position: absolute; */
  width: 100%;
  bottom: 0;
  /* height: 80px; */
  padding: 15px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  background-color: #fff;
`;
const TPName = styled("div")`
  position: absolute;
  top: 0;
  z-index: 1;
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

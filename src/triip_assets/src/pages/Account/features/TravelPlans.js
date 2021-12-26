import { Grid, Modal, Slide, Stack, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";
import TravelPlanDetail from "../container/TravelPlan/TravelPlan";
import { Empty, Loading } from "../../../components";

const TravelPlans = () => {
  const { actor } = useSelector(state => state.user);
  const [tps, setTps] = useState([]);
  const [tpDetail, setTpDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        if (!!actor?.readAllTPUser) {
          const rs = await actor?.readAllTPUser();
          if ("ok" in rs) {
            setTps(rs.ok);
          } else {
            throw rs?.err;
          }
        }
      } catch (error) {
        log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [actor]);
  const handleTPItem = idtp => {
    setTpDetail(tps.find(tp => tp[0] === idtp));
  };

  return (
    <>
      <Grid container spacing={3} justifyContent={{ xs: "center", sm: "flex-start" }}>
        {isLoading ? (
          <Loading height="70vh" />
        ) : tps?.length > 0 ? (
          tps?.map((tp, intp) => (
            <TravelPlanItem
              key={intp}
              idtp={tp[0]}
              tp={tp[1]?.travel_plan}
              pStatus={tp?.at(2)?.at(0)?.status}
              onClick={() => handleTPItem(tp[0])}
            />
          ))
        ) : (
          <Empty />
        )}
      </Grid>
      <Modal
        open={!!tpDetail?.length > 0}
        onClose={() => setTpDetail([])}
        sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Slide direction="left" in={!!tpDetail?.length > 0} mountOnEnter unmountOnExit>
          <TravelPlanDetail travelplan={tpDetail} />
        </Slide>
      </Modal>
    </>
  );
};
function switchStatusProof(STATUS) {
  switch (STATUS) {
    case "approved":
      return "Approved";
    case "waitting":
      return "New";
    default:
      return "Reject";
  }
}
const TravelPlanItem = ({ idtp, tp, pStatus, onClick }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Grid item xs={10} sm={6} md={4} lg={3} onClick={onClick}>
      <Box sx={{ borderRadius: "16px", boxShadow: theme.shadows[18] }}>
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
            Proof of travel - {pStatus ? switchStatusProof(pStatus) : "No Submit"}
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

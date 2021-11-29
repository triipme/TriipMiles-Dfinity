import { styled, useTheme } from "@mui/system";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";

const TravelPlanDetail = forwardRef(({ travelplan }, ref) => {
  const theme = useTheme();
  const { activities, join_type, destination } = useSelector(state => state.static.travelplan);
  return (
    <TPDContainer ref={ref}>
      <TPDImage src={travelplan[1]?.travel_plan?.img[0]} />
      <TPDBody>
        <Typography variant="h5">{travelplan[1]?.travel_plan?.destination}</Typography>
        <Stack direction="row" alignItems="center" my={2}>
          <Icon style={{ marginRight: 10 }} icon="bx:bx-calendar" />
          <Typography variant="body1">
            {travelplan[1]?.travel_plan?.specific_date
              ? `${travelplan[1]?.travel_plan?.days} days`
              : `${moment
                  .unix(travelplan[1]?.travel_plan?.timeStart)
                  .format("LL")
                  .toString()} - ${moment
                  .unix(travelplan[1]?.travel_plan?.timeEnd)
                  .format("LL")
                  .toString()}`}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" my={2}>
          <Icon style={{ marginRight: 10 }} icon="healthicons:travel-alt" />
          <Typography>{join_type[travelplan[1]?.travel_plan?.join_type - 1]}</Typography>
        </Stack>
        <Stack direction="row" my={2}>
          <Icon style={{ marginRight: 15 }} icon="bx:bxs-star" />
          <Typography>
            {activities.filter((_, inact) => travelplan[1]?.travel_plan?.activities[0][inact])}
          </Typography>
        </Stack>
      </TPDBody>
      <Divider />
      <TPDBody>
        <Stack direction="row" alignItems="center" my={1}>
          <Typography fontWeight="bold" variant="body1">
            Travel Documents (proof of travel)
          </Typography>
          <Icon
            style={{ marginLeft: 10 }}
            icon="ph:warning-circle-fill"
            color={theme.palette.secondary.main}
          />
        </Stack>
        <Typography variant="body2">Your fight detail, booking information, etc...</Typography>
      </TPDBody>
    </TPDContainer>
  );
});

const TPDContainer = styled(Box)(({ theme }) => ({
  width: "30%",
  height: "100vh",
  backgroundColor: "white",
  outline: "none"
}));
const TPDImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: 250,
  objectFit: "cover"
}));
const TPDBody = styled(Box)(({ theme }) => ({
  padding: 20
}));

export default TravelPlanDetail;

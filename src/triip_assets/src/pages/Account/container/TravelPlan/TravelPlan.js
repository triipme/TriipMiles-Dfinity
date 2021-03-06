import { styled, useTheme } from "@mui/system";
import { Box, Divider, Stack, Typography, Modal } from "@mui/material";
import React, { forwardRef, useEffect, useLayoutEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { useGetFile } from "../../../../hooks";
import { HP } from "../../../Home/containers";
import { ContentModalStyled } from "../../../Home/Home.style";
import SimpleBarReact from "simplebar-react";
import { tranvelPlansAPI } from "../../../../slice/user/thunk";

function switchContentStatusApprove(status) {
  switch (status) {
    case "approved":
      return "Congratulations! Your proof is approved. Thanks for your contribution to sustainable travel.";
    case "waitting":
      return "Your proof upload is completed. Our approvers are working hard for the verification process. Thanks for your patience.";
    default:
      return `Your proof is rejected. Reason: ${status?.split("||")[1]}`;
  }
}

function switchIconStatusApprove(status) {
  switch (status) {
    case "approved":
      return "ep:success-filled";
    case "waitting":
      return "bi:clock-fill";
    default:
      return "ci:off-close";
  }
}

const TravelPlanDetail = forwardRef(({ travelplan }, ref) => {
  const theme = useTheme();
  const [idtp, setIdtp] = useState("");
  const [proofImg] = useGetFile(travelplan?.at(2)?.at(0)?.proof?.img_key[0]);
  const [proofData] = useState(travelplan?.at(2)?.at(0));
  const { activities, join_type, destination } = useSelector(state => state.static.travelplan);

  return (
    <TPDContainer ref={ref}>
      <SimpleBarReact style={{ maxHeight: "100vh" }}>
        <TPDImage src={travelplan[1]?.travel_plan?.img[0]} />
        <TPDBody>
          <Typography variant="h5">{travelplan[1]?.travel_plan?.destination}</Typography>
          <Stack direction="row" alignItems="center" my={2}>
            <Icon style={{ marginRight: 10 }} icon="bx:bx-calendar" />
            <Typography variant="body1">
              {travelplan[1]?.travel_plan?.specific_date[0]
                ? `${moment
                    .unix(travelplan[1]?.travel_plan?.timeStart)
                    .format("LL")
                    .toString()} - ${moment
                    .unix(travelplan[1]?.travel_plan?.timeEnd)
                    .format("LL")
                    .toString()}`
                : `${travelplan[1]?.travel_plan?.days} days`}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" my={2}>
            <Icon style={{ marginRight: 10 }} icon="healthicons:travel-alt" />
            <Typography>{join_type[travelplan[1]?.travel_plan?.join_type - 1]}</Typography>
          </Stack>
          <Stack direction="row" mt={2}>
            <Icon style={{ marginRight: 10 }} icon="bx:bxs-star" />
            <Typography sx={{ flex: 1 }}>
              {activities
                .filter((_, inact) => travelplan[1]?.travel_plan?.activities[0][inact])
                .join(",")}
            </Typography>
          </Stack>
        </TPDBody>
        <Divider />
        <TPDBody>
          <Stack direction="row" alignItems="center" mb={1}>
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
          <HappyProof>
            {proofImg ? (
              <Box position="relative" mr={2}>
                <HPImg
                  src={proofImg?.image ?? "https://source.unsplash.com/random"}
                  alt="proof image"
                />
                <Icon
                  icon={switchIconStatusApprove(proofData?.status)}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)"
                  }}
                  color={theme.palette.secondary.main}
                />
              </Box>
            ) : (
              <HPUploadProof onClick={() => setIdtp(travelplan[0])}>
                <Icon icon="bi:image-fill" color={theme.palette.secondary.main} />
              </HPUploadProof>
            )}
            <Typography variant="body2" sx={{ flex: 1 }}>
              {proofImg
                ? switchContentStatusApprove(proofData?.status)
                : "Submit your Proof-Of-Travel before your last day, and earn 0.000033 ICP when your proof get approved."}
            </Typography>
          </HappyProof>
        </TPDBody>
        <Modal open={!!idtp} onClose={() => setIdtp()}>
          <ContentModalStyled>
            <HP idtp={idtp} />
          </ContentModalStyled>
        </Modal>
      </SimpleBarReact>
    </TPDContainer>
  );
});

const HPUploadProof = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 60,
  height: 60,
  borderRadius: 10,
  border: "2px dashed gray",
  marginRight: 20
}));

const HPImg = styled("img")`
  min-width: 60px;
  max-width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 10px;
`;
const HappyProof = styled(Box)`
  /* border-style: dashed; */
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const TPDContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "50%"
  },
  [theme.breakpoints.up("md")]: {
    width: "40%"
  },
  [theme.breakpoints.up("lg")]: {
    width: "35%"
  },
  width: "80%",
  height: "100vh",
  backgroundColor: "white"
}));
const TPDImage = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    maxWidth: "100%",
    maxHeight: 270,
    minHeight: 220
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "100%",
    maxHeight: 220,
    minHeight: 220
  },
  minWidth: "100%",
  minHeight: 200,
  objectFit: "cover"
}));
const TPDBody = styled(Box)(({ theme }) => ({
  padding: 20
}));

export default TravelPlanDetail;

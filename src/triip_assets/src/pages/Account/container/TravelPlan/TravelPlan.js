import { styled, useTheme } from "@mui/system";
import { Box, Divider, Stack, Typography, Modal } from "@mui/material";
import React, { forwardRef, useEffect, useLayoutEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { useGetFile } from "../../../../hooks";
import { HP } from "../../../Home/containers";
import { ContentModalStyled } from "../../../Home/Home.style";

const TravelPlanDetail = forwardRef(({ travelplan }, ref) => {
  const theme = useTheme();
  const [idtp, setIdtp] = useState("");
  const [proofImg, setProofImg] = useGetFile();
  const { actor } = useSelector(state => state.user);
  const { activities, join_type, destination } = useSelector(state => state.static.travelplan);
  useLayoutEffect(() => {
    (async () => {
      if (!!actor?.readProofOfTP) {
        const proof = await actor?.readProofOfTP(travelplan[0] ?? "");
        if ("ok" in proof) {
          console.log(proof?.ok?.proof?.img_key[0]);
          setProofImg(proof?.ok?.proof?.img_key[0]);
        } else {
          console.log(proof?.err);
        }
      }
    })();
    return () => {
      setIdtp();
    };
  }, [travelplan[0]]);
  console.log(proofImg);
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
            <HPImg
              src={proofImg?.image ?? "https://source.unsplash.com/random"}
              alt="proof image"
            />
          ) : (
            <HPUploadProof onClick={() => setIdtp(travelplan[0])}>
              <Icon icon="bi:image-fill" color={theme.palette.secondary.main} />
            </HPUploadProof>
          )}
          <Typography variant="body2">
            Submit your Proof-Of-Travel before your last day, and earn 0.000033 ICP when your proof
            get approved.
          </Typography>
        </HappyProof>
      </TPDBody>
      <Modal open={!!idtp} onClose={() => setIdtp()}>
        <ContentModalStyled>
          <HP idtp={idtp} />
        </ContentModalStyled>
      </Modal>
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
  height: 60px;
  margin-right: 20px;
  object-fit: cover;
  border-radius: 10px;
`;
const HappyProof = styled(Box)`
  /* border-style: dashed; */
  margin-top: 20px;
  display: flex;
  align-items: center;
`;
const TPDContainer = styled(Box)(({ theme }) => ({
  width: "30%",
  height: "100vh",
  backgroundColor: "white",
  outline: "none",
  overflowY: "scroll"
}));
const TPDImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: 220,
  objectFit: "cover"
}));
const TPDBody = styled(Box)(({ theme }) => ({
  padding: 20
}));

export default TravelPlanDetail;

import React, { useState } from "react";
import { Typography, Box, Modal } from "@mui/material";
import { ButtonPrimary, ScrollHidden } from "../../../components/index";
import { useNavigate } from "react-router-dom";
import { resizeImg } from "../../../functions";
import { customAlphabet } from "nanoid";
import { useUploadFile } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";
import { styled, useTheme } from "@mui/system";
import { Icon } from "@iconify/react";
import { tranvelPlansAPI } from "../../../slice/user/thunk";

const HP = ({ idtp }) => {
  const theme = useTheme();
  const { actor } = useSelector(state => state.user);
  const { profile } = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const [status, setStatus] = useState(false);
  const [image, progress, setFile] = useUploadFile();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUpFileHP = async e => {
    try {
      setIsLoading(true);
      const img = await resizeImg({ blob: e.target.files[0], asprX: 20, asprY: 20 });
      if (!!actor?.createProofTP) {
        const result = await actor?.createProofTP(idtp, {
          img_key: [
            `${
              process.env.NODE_ENV === "development" ? "development" : "production" || "production"
            }/${profile?._id}/travel_plan/${idtp}/${customAlphabet(
              img?.name ?? process.env.NANOID_ALPHABET_S3,
              16
            )()}.${img?.type.split("/")[1]}`
          ],
          created_at: [moment(new Date()).unix()]
        });
        if ("ok" in result) {
          await setFile({
            file: img,
            name: result?.ok[0]
          });
          toast.success("Success !.");
          await setStatus(true);
          // handleIsOpenParent(false);
        } else {
          throw result?.err;
        }
      } else {
        toast.error("Please sign in!.");
      }
    } catch (error) {
      setIsError(Object.keys(error)[0]);
    } finally {
      setIsLoading(false);
      dispatch(tranvelPlansAPI());
    }
  };
  console.log(isError);
  return (
    <>
      <ScrollHidden
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 500 - 32
        }}>
        {!status ? (
          <>
            <Box>
              <Typography sx={{ mb: 4 }} variant="h6" align="center">
                Happy Planning
              </Typography>
              <Typography sx={{ mb: 2 }} variant="body2" align="center">
                You will receive 0.000001 ICP <br />
                for submitting your travel plan.
              </Typography>
              <Typography sx={{ mb: 2 }} variant="body2" align="center">
                Go to your Travel Plans to review, edit your submitted plans.
              </Typography>
              <Typography sx={{ mb: 2 }} variant="body2" align="center">
                Submit your proof of travel after the trip <br />
                to earn 0.000033 ICP more for every plan you
                <br />
                create.
              </Typography>
            </Box>
            <Box>
              <label htmlFor="fileHP">
                <input
                  type="file"
                  name="fileHP"
                  id="fileHP"
                  style={{ display: "none" }}
                  onChange={handleUpFileHP}
                />
                <ButtonPrimary loading={isLoading} title="Submit Proof" />
              </label>
              <ButtonPrimary
                sx={{ mt: 2 }}
                title="Go to travel plans"
                onClick={() => navigate("/account/travelplans")}
              />
            </Box>
          </>
        ) : (
          <>
            <Box>
              <Typography sx={{ mb: 2 }} variant="h6" align="center">
                Uploading travel document
              </Typography>
              <img
                src={image?.image}
                style={{ width: "80%", height: 160, objectFit: "cover", borderRadius: 12 }}
                alt="Uploading travel document"
              />
              <Typography
                sx={{ mt: 2, mb: 1, color: theme.palette.primary.main }}
                variant="h6"
                align="center">
                Upload Completed
              </Typography>
              <Typography sx={{ mb: 1 }} variant="body2" align="center">
                You will receive 33.0 TIIM <br />
                when your travel proof is approved
              </Typography>
              <Typography sx={{ mb: 1 }} variant="body2" align="center">
                Go to your Travel Plans to review, edit your submitted plans.
              </Typography>
            </Box>
            <ButtonPrimary
              sx={{ mt: 2 }}
              title="Go to travel plans"
              onClick={() => navigate("/account/travelplans")}
            />
          </>
        )}
      </ScrollHidden>
      <Modal open={!!isError}>
        <ContentModalStyled sx={{ textAlign: "center" }}>
          <Typography variant="h6">Warning</Typography>
          <Box>
            <Box
              width={70}
              height={70}
              display="grid"
              borderRadius={100}
              mx="auto"
              sx={{ placeItems: "center", backgroundColor: theme.palette.grey[700] }}>
              <Icon icon="ant-design:warning-filled" color={theme.palette.white.main} />
            </Box>
            <Typography mt={3}>
              {
                {
                  AlreadyExisting: "Proof of Travel already !.",
                  NotFound: "Not Found Travel Plan !.",
                  Failed:
                    "You just only submit Proof of Travel after start date and before end date !."
                }[isError]
              }
            </Typography>
          </Box>
          <ButtonPrimary sx={{ mt: 2 }} title="Close" onClick={() => setIsError()} />
        </ContentModalStyled>
      </Modal>
    </>
  );
};

const ContentModalStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: 400
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "90%",
  height: 500,
  padding: "25px 15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  backgroundColor: theme.palette.white.main,
  borderRadius: 20,
  overflow: "hidden",
  outline: "none"
}));
export default HP;

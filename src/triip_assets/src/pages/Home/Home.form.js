import React, { useContext, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material/index";

import {
  ButtonPrimary,
  InputCheckbox,
  InputDate,
  InputRadio,
  InputSwitch,
  InputText,
  ScrollHidden
} from "../../components/index";
import { ActorContext } from "../../routers";
import { resizeImg } from "../../functions";

import moment from "moment";
import { customAlphabet } from "nanoid";
import toast, { Toaster } from "react-hot-toast";

import { ContentModalStyled } from "./Home.style";
import { theme } from "../../theme";

const HomeForm = ({ handleIsOpenParent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createdStatus, setCreatedStatus] = useState("TP");
  const { activities, join_type } = useSelector(state => state.static.travelplan);
  const [imgHP, setImgHP] = useState("");
  const [nntp] = useState(customAlphabet("tpif_44_djattp", 24)());
  const actor = useContext(ActorContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue
  } = useForm({
    defaultValues: {
      destination: "",
      join_type: join_type[0],
      public_mode: false,
      img: ""
    }
  });

  const body = () => {
    const {
      destination,
      join_type: joinStatus,
      timeStart,
      timeEnd,
      public_mode,
      img,
      ...activities
    } = getValues();
    return {
      idtp: nntp,
      travel_plan: {
        destination: [destination],
        join_type: [join_type.findIndex(item => item === joinStatus) + 1],
        activities: [Object.values(activities)],
        timeStart: [moment(timeStart).unix()],
        timeEnd: [moment(timeEnd).unix()],
        created_at: [moment(new Date()).unix()],
        days: [
          moment
            .duration(moment(timeEnd).unix(), "s")
            .subtract(moment.duration(moment(timeStart).unix(), "s"))
            .days()
        ],
        public_mode: [public_mode],
        img: [img]
      }
    };
  };

  const handleUpFileHP = async e => {
    const img = await resizeImg({ blob: e.target.files[0], asprX: 16, asprY: 16 });
    setImgHP(img);
    setValue("img", img);
    console.log(actor);
    if (!!actor) {
      setIsLoading(true);
      actor
        ?.updateTravelPlan(body())
        .then(async result => {
          if ("ok" in result) {
            console.log(result.ok);
            toast.success("Success !.");
            setCreatedStatus("HPSuccess");
            // handleIsOpenParent(false);
          } else {
            console.error(result.err);
            setIsLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error("Please sign in!.");
    }
  };

  const onSubmit = async () => {
    if (!!actor) {
      setIsLoading(true);
      actor
        ?.createTravelPlan(body())
        .then(async result => {
          if ("ok" in result) {
            console.log(result.ok);
            toast.success("Success !.");
            setCreatedStatus("HP");
            // handleIsOpenParent(false);
          } else {
            console.error(result.err);
            setIsLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error("Please sign in!.");
    }
  };

  const onUpdate = async () => {
    if (!!actor) {
      setIsLoading(true);
      actor
        ?.updateTravelPlan(body())
        .then(async result => {
          if ("ok" in result) {
            console.log(result.ok);
            toast.success("Success !.");
            handleIsOpenParent(false);
          } else {
            console.error(result.err);
            setIsLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error("Please sign in!.");
    }
  };

  return (
    <div>
      <ContentModalStyled>
        {
          {
            "TP": (
              <ScrollHidden>
                <Typography sx={{ mb: 2 }} variant="h6">
                  Create Your Travel Plan
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  Where will you go?
                </Typography>
                <InputText
                  control={control}
                  placeHolder="Enter your destination"
                  label="Destination"
                  name="destination"
                />
                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  How many people will join?
                </Typography>
                <InputRadio
                  data={join_type}
                  control={control}
                  name="join_type"
                  defaultValue={join_type[0]}
                />
                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  Activities you like?
                </Typography>
                <Box display="flex" flexWrap="wrap">
                  {activities.map(item => (
                    <InputCheckbox
                      key={item}
                      data={activities}
                      control={control}
                      name={item}
                      defaultValue={false}
                    />
                  ))}
                </Box>
                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                  When will you be there?
                </Typography>
                <InputDate control={control} name="timeStart" label="Start" />
                <Box marginTop={2}>
                  <InputDate control={control} name="timeEnd" label="End" />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1, mt: 2 }}>
                  <Typography variant="body1">Public plan?</Typography>
                  <InputSwitch control={control} name="public_mode" />
                </Box>
                <Typography variant="body2">
                  Public plans can be seen by Triip Protocol partners/travelers so that they can
                  give you recommendations or just for you to share where you will be going next
                </Typography>
                <ButtonPrimary
                  loading={isLoading}
                  sx={{ mt: 2 }}
                  title="Create Travel Plan"
                  onClick={handleSubmit(onSubmit)}
                />
              </ScrollHidden>
            ),
            "HP": (
              <ScrollHidden
                sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ mb: 4 }} variant="h6" align="center">
                    Happy Planning
                  </Typography>
                  <Typography sx={{ mb: 2 }} variant="body2" align="center">
                    You will receive 1.0 TIIM <br />
                    for submitting your travel plan.
                  </Typography>
                  <Typography sx={{ mb: 2 }} variant="body2" align="center">
                    Go to your Travel Plans to review, edit your submitted plans.
                  </Typography>
                  <Typography sx={{ mb: 2 }} variant="body2" align="center">
                    Submit your proof of travel after the trip <br />
                    to earn 33.0 TIIM more for every plan you
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
                  <ButtonPrimary sx={{ mt: 2 }} title="Go to travel plans" onClick={() => {}} />
                </Box>
              </ScrollHidden>
            ),
            "HPSuccess": (
              <ScrollHidden
                sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ mb: 2 }} variant="h6" align="center">
                    Uploading travel document
                  </Typography>
                  <img
                    src={imgHP}
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
                    when you travel proof if approved.
                  </Typography>
                  <Typography sx={{ mb: 1 }} variant="body2" align="center">
                    Go to your Travel Plans to review, edit your submitted plans.
                  </Typography>
                </Box>
                <Box>
                  <ButtonPrimary sx={{ mt: 2 }} title="Go to travel plans" onClick={() => {}} />
                </Box>
              </ScrollHidden>
            )
          }[createdStatus]
        }
      </ContentModalStyled>
    </div>
  );
};

export default HomeForm;

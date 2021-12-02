import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Typography, Box, Stack, IconButton } from "@mui/material/index";
import {
  ButtonPrimary,
  InputCheckboxLabel,
  InputCheckbox,
  InputDate,
  InputRadio,
  InputSwitch,
  InputText,
  ScrollHidden
} from "../../components/index";

import moment from "moment";
import { customAlphabet } from "nanoid";
import toast, { Toaster } from "react-hot-toast";
import { ERRORS } from "../../utils/constants";

import { ContentModalStyled } from "./Home.style";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { HP } from "./containers";

const HomeForm = ({ handleIsOpenParent }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [createdStatus, setCreatedStatus] = useState("TP");
  const {
    activities,
    join_type,
    destination: destinationStatic
  } = useSelector(state => state.static.travelplan);
  const [nntp] = useState(customAlphabet(process.env.NANOID_ALPHABET_TP, 24)());
  const { actor } = useSelector(state => state.user);
  const [days, setDays] = useState(1);
  const [idtp, setIdtp] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      destination: "",
      join_type: join_type[0],
      public_mode: false,
      img: "",
      specific_date: true,
      days: 1
    }
  });

  const specificDateWatch = watch("specific_date");
  const body = () => {
    const {
      destination,
      join_type: joinStatus,
      timeStart,
      timeEnd,
      public_mode,
      img,
      days,
      specific_date,
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
        // days: [
        //   moment
        //     .duration(moment(timeEnd).unix(), "s")
        //     .subtract(moment.duration(moment(timeStart).unix(), "s"))
        //     .days()
        // ],
        days: [days],
        specific_date: [specific_date],
        public_mode: [public_mode],
        img: destinationStatic.find(ides => ides?.name === destination)?.photos
      }
    };
  };
  const onSubmit = async () => {
    if (!!actor) {
      setIsLoading(true);
      actor
        ?.createTravelPlan(body())
        .then(async result => {
          if ("ok" in result) {
            console.log(result.ok);
            setIdtp(result.ok);
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

  const handleDays = status => {
    if (status === "increment") {
      setDays(days => days + 1);
    } else if (status === "decrease" && days > 1) {
      setDays(days => days - 1);
    }
    setValue("days", days);
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
                  helperTextError={ERRORS}
                  autocompleteOptions={destinationStatic}
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
                    <InputCheckboxLabel
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
                <Box py={2} px={3} sx={{ backgroundColor: "#fafafa", borderRadius: 3 }}>
                  <Stack mb={2} direction="row" alignItems="center" justifyContent="space-between">
                    <Typography fontWeight="bold" variant="body2">
                      Have sepecific date?
                    </Typography>
                    <InputCheckbox control={control} name="specific_date" />
                  </Stack>
                  {specificDateWatch ? (
                    <>
                      <InputDate control={control} name="timeStart" label="Start" />
                      <Box marginTop={2}>
                        <InputDate control={control} name="timeEnd" label="End" />
                      </Box>
                    </>
                  ) : (
                    <>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight="bold" variant="body2">
                          How many days
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          sx={{ backgroundColor: theme.palette.white.main, borderRadius: 10 }}>
                          <IconButton onClick={() => handleDays("decrease")}>
                            <Icon icon="ic:baseline-remove-circle" />
                          </IconButton>
                          <Typography mx={2}>{days}</Typography>
                          <IconButton onClick={() => handleDays("increment")}>
                            <Icon
                              icon="ic:baseline-add-circle"
                              color={theme.palette.primary.main}
                            />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </>
                  )}
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
            "HP": <HP idtp={idtp} />
          }[createdStatus]
        }
      </ContentModalStyled>
    </div>
  );
};

export default HomeForm;

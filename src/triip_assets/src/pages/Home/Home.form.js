import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Typography, Box } from "@mui/material/index";

import {
  ButtonPrimary,
  InputCheckbox,
  InputDate,
  InputRadio,
  InputSwitch,
  InputText
} from "../../components/index";
import { ActorContext } from "../../routers";

import moment from "moment";
import { customAlphabet } from "nanoid";
import toast, { Toaster } from "react-hot-toast";

const HomeForm = ({ handleIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { activities, join_type } = useSelector(state => state.static.travelplan);
  const actor = useContext(ActorContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    destination: "",
    join_type: "",
    activities: Array(activities.length).fill(false),
    timeStart: 0, //timestamp to start travel, but time>current time
    timeEnd: 0,
    days: 1,
    public_mode: false
  });
  const onSubmit = async data => {
    const {
      destination,
      join_type: joinStatus,
      timeStart,
      timeEnd,
      public_mode,
      ...activities
    } = data;
    const body = {
      idtp: customAlphabet("tpif_44_djattp", 24)(),
      travel_plan: {
        destination: [destination],
        join_type: [join_type.findIndex(item => item === joinStatus) + 1],
        activities: [Object.values(activities)],
        timeStart: [moment(timeStart).unix()],
        timeEnd: [moment(timeEnd).unix()],
        days: [
          moment
            .duration(moment(timeEnd).unix(), "s")
            .subtract(moment.duration(moment(timeStart).unix(), "s"))
            .days()
        ],
        public_mode: [public_mode]
      }
    };
    if (!!actor) {
      setIsLoading(true);
      actor
        ?.createTravelPlan(body)
        .then(async result => {
          if ("ok" in result) {
            console.log(result.ok);
            toast.success("Success !.");
            handleIsOpen(false);
            reset();
          } else {
            console.error(result.err);
            setIsLoading(false);
          }
        })
        .catch(err => {})
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error("Please sign in!.");
    }
  };
  return (
    <>
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
      <InputRadio data={join_type} control={control} name="join_type" defaultValue={join_type[0]} />
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
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1, mt: 2 }}>
        <Typography variant="body1">Public plan?</Typography>
        <InputSwitch control={control} name="public_mode" />
      </Box>
      <Typography variant="body2">
        Public plans can be seen by Triip Protocol partners/travelers so that they can give you
        recommendations or just for you to share where you will be going next
      </Typography>
      <ButtonPrimary
        loading={isLoading}
        sx={{ mt: 2 }}
        title="Create Travel Plan"
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default HomeForm;

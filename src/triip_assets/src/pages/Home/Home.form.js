import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Typography } from "@mui/material/index";

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

const HomeForm = ({ handleIsOpen }) => {
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
    actor?.createTravelPlan(body).then(async result => {
      if ("ok" in result) {
        console.log(result.ok);
        handleIsOpen(false);
        reset();
      } else {
        console.error(result.err);
      }
    });
  };
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h6">
        Create Your Travel Plan
      </Typography>
      <Typography variant="subtitle2">Where will you go?</Typography>
      <InputText
        control={control}
        placeHolder="Enter your destination"
        label="Destination"
        name="destination"
      />
      <Typography variant="subtitle2">How many people will join?</Typography>
      <InputRadio data={join_type} control={control} name="join_type" defaultValue={join_type[0]} />
      <Typography variant="subtitle2">Activities you like?</Typography>
      <div>
        {activities.map(item => (
          <InputCheckbox
            key={item}
            data={activities}
            control={control}
            name={item}
            defaultValue={false}
          />
        ))}
      </div>
      <Typography variant="subtitle2">When will you be there?</Typography>
      <InputDate control={control} name="timeStart" label="Start" />
      <InputDate control={control} name="timeEnd" label="End" />
      <Typography variant="subtitle2">Public plan?</Typography>
      <InputSwitch control={control} name="public_mode" />
      <ButtonPrimary title="Create Travel Plan" onClick={handleSubmit(onSubmit)} />
    </>
  );
};

export default HomeForm;

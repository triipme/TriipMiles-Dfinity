import React from "react";
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

const HomeForm = () => {
  const { activities, join_type } = useSelector(state => state.static.travelplan);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    destination: "",
    join_type: "",
    activities: Array(activities.length).fill(false),
    timeStart: 0, //timestamp to start travel, but time>current time
    timeEnd: 0,
    days: 1,
    public_mode: false
  });
  const onSubmit = data => {
    const {
      destination,
      join_type: joinStatus,
      timeStart,
      timeEnd,
      public_mode,
      ...activities
    } = data;
    console.log({
      destination,
      join_type: join_type.findIndex(item => item === joinStatus) + 1,
      activities: Object.values(activities),
      timeStart,
      timeEnd,
      public_mode
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
      <InputRadio data={join_type} control={control} name="join_type" />
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
      <ButtonPrimary title="Submut" onClick={handleSubmit(onSubmit)} />
    </>
  );
};

export default HomeForm;

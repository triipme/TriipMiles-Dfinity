import React from "react";
import { Typography } from "@mui/material/index";
import { useForm } from "react-hook-form";
import { InputRadio, InputText } from "../../components/index";

const HomeForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
  return (
    <div>
      <Typography sx={{ mb: 2 }} variant="h6">
        Create Your Travel Plan
      </Typography>
      <Typography variant="subtitle2">Where will you go?</Typography>
      <InputText control={control} label="Test" name="test" />
      <Typography variant="subtitle2">How many people will join?</Typography>
      <InputRadio data={["Solo", "Couple", "Family", "Group"]} control={control} name="radio" />
      <Typography variant="subtitle2">Activities you like?</Typography>
    </div>
  );
};

export default HomeForm;

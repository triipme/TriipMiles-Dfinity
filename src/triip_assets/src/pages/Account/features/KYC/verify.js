import React, { useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { FormKYC } from "../../form";
import { useForm } from "react-hook-form";

const Verify = () => {
  const {
    control,
    formState: { errors }
  } = useForm();
  const [step, setStep] = useState(1);
  const handleS1 = () => setStep(2);
  const handleS2 = () => setStep(3);
  const handleS3 = () => {};
  return (
    <Box>
      <Stack mb={2}>
        <Typography variant="body1" fontWeight="600">
          ID AUTHENTICATION
        </Typography>
        <Typography variant="caption">
          Provide us with your personal information and proof of identity
        </Typography>
      </Stack>
      <Divider />
      {
        {
          1: <FormKYC.S1 control={control} handleS1={handleS1} />,
          2: <FormKYC.S2 control={control} handleS2={handleS2} />,
          3: <FormKYC.S3 control={control} handleS3={handleS3} />
        }[step]
      }
    </Box>
  );
};
export default Verify;

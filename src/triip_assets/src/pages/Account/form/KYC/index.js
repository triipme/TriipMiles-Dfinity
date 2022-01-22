import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { ButtonPrimary, InputRadio, InputText } from "../../../../components";
import { ERRORS } from "../../../../utils/constants";

const S1 = ({ control, handleS1 }) => {
  return (
    <Box>
      <Grid container width="70%" columnSpacing={3} mt={3}>
        <Grid item md={6}>
          <InputText
            control={control}
            label="FIRST NAME"
            helperTextError={ERRORS}
            name="FIRST NAME"
          />
        </Grid>
        <Grid item md={6}>
          <InputText
            control={control}
            label="LAST NAME"
            helperTextError={ERRORS}
            name="LAST NAME"
          />
        </Grid>
        <Grid item md={6}>
          <InputText
            control={control}
            label="YOUR EMAIL"
            helperTextError={ERRORS}
            name="YOUR EMAIL"
          />
        </Grid>
        <Grid item md={6}>
          <InputText
            control={control}
            label="YOUR PHONE NO."
            helperTextError={ERRORS}
            name="YOUR PHONE NO."
          />
        </Grid>
        <Grid item md={6}>
          <InputText
            control={control}
            label="COUNTRY"
            helperTextError={ERRORS}
            name="COUNTRY"
            autocompleteOptions={[]}
          />
        </Grid>
        <Grid item md={6}>
          <InputText
            control={control}
            label="CITIZENSHIP"
            helperTextError={ERRORS}
            name="CITIZENSHIP"
            autocompleteOptions={[]}
          />
        </Grid>
        <Grid item md={6}>
          <InputText control={control} label="ADDRESS" helperTextError={ERRORS} name="ADDRESS" />
        </Grid>
      </Grid>
      <Box mt={1}>
        <ButtonPrimary sx={{ width: "25%" }} title="BEGIN VERIFICATION" onClick={handleS1} />
      </Box>
    </Box>
  );
};
const S2 = ({ control, handleS2 }) => {
  return (
    <Box width="50%">
      <>
        <Typography mt={2} mb={1}>
          Please choose your ID type
        </Typography>
        <InputRadio
          name="id_type"
          control={control}
          data={["ID Card", "Passport", "Driver License"]}
        />
      </>
      <Divider />
      <>
        <Typography mt={2} mb={1}>
          Please type your ID Number
        </Typography>
        <InputText control={control} name="id_number" helperTextError={ERRORS} />
        <Box mb={3}>
          <Typography variant="caption">
            We'll never share your card id number with anyone else.
          </Typography>
        </Box>
      </>
      <Divider />
      <>
        <Typography mt={2} mb={1}>
          Please choose photos of your ID to submit
        </Typography>
        <Stack flexDirection="row">
          <label htmlFor="front_photo">
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Input type="file" id="front_photo" />
              <UploadBox />
              <Typography variant="caption" align="center" mt={1}>
                Front
              </Typography>
            </Box>
          </label>
          <label htmlFor="back_photo">
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Input type="file" id="back_photo" />
              <UploadBox mx={2} />
              <Typography variant="caption" align="center" mt={1}>
                Back
              </Typography>
            </Box>
          </label>
          <label htmlFor="selfie_photo">
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Input type="file" id="selfie_photo" />
              <UploadBox />
              <Typography variant="caption" align="center" mt={1}>
                Your Selfie
              </Typography>
            </Box>
          </label>
        </Stack>
      </>
      <Box mt={3}>
        <ButtonPrimary sx={{ width: "25%" }} title="CONFIRM" onClick={handleS2} />
      </Box>
    </Box>
  );
};

const S3 = () => {
  return (
    <Box my={5}>
      <Typography align="center">Comming Soon. 🥳🥳🥳</Typography>
    </Box>
  );
};

const Input = styled("input")`
  display: none;
`;
const UploadBox = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: 10,
  backgroundColor: theme.palette.grey[400]
}));

export const FormKYC = {
  S1: S1,
  S2: S2,
  S3: S3
};

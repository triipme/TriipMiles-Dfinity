import { Box, Divider, Grid, Stack, Typography, CardMedia } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import {
  ButtonOutline,
  ButtonPrimary,
  InputFile,
  InputRadio,
  InputText
} from "../../../../components";
import { ERRORS } from "../../../../utils/constants";

const S1 = ({ control, handleS1 }) => {
  const { country, citizenships } = useSelector(state => state.static);
  return (
    <Box>
      <Grid container width="70%" columnSpacing={3} mt={3}>
        <Grid item md={6}>
          <InputText control={control} label="FIRST NAME" helperTextError={ERRORS} name="fname" />
        </Grid>
        <Grid item md={6}>
          <InputText control={control} label="LAST NAME" helperTextError={ERRORS} name="lname" />
        </Grid>
        <Grid item md={6}>
          <InputText control={control} label="YOUR EMAIL" helperTextError={ERRORS} name="email" />
        </Grid>
        <Grid item md={6}>
          <InputText
            control={control}
            label="YOUR PHONE NO."
            helperTextError={ERRORS}
            name="phone"
          />
        </Grid>
        <Grid item md={6}>
          <InputText
            control={control}
            label="COUNTRY"
            helperTextError={ERRORS}
            name="country"
            autocompleteOptions={country.map(c => c.name)}
          />
        </Grid>
        <Grid item md={6}>
          <InputText
            control={control}
            label="CITIZENSHIP"
            helperTextError={ERRORS}
            name="citizenship"
            autocompleteOptions={citizenships.map(c => c.name)}
          />
        </Grid>
        <Grid item md={6}>
          <InputText control={control} label="ADDRESS" helperTextError={ERRORS} name="address" />
        </Grid>
      </Grid>
      <Box mt={1}>
        <ButtonPrimary sx={{ width: "25%" }} title="BEGIN VERIFICATION" onClick={handleS1} />
      </Box>
    </Box>
  );
};
const S2 = ({ control, handleS2, onBack }) => {
  return (
    <Box width="50%">
      <>
        <Typography mt={2} mb={1}>
          Please choose your ID type
        </Typography>
        <InputRadio
          defaultValue="ID Card"
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
              <InputFile
                id="front_photo"
                control={control}
                name="front_photo"
                children={({ value, error }) => {
                  return <UploadBox error={!!error} image={value?.preview} component="img" />;
                }}
              />
              <Typography variant="caption" align="center" mt={1}>
                Front
              </Typography>
            </Box>
          </label>
          <label htmlFor="back_photo">
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <InputFile
                id="back_photo"
                control={control}
                name="back_photo"
                children={({ value, error }) => {
                  return (
                    <UploadBox
                      error={!!error}
                      sx={{ mx: 2 }}
                      image={value?.preview}
                      component="img"
                    />
                  );
                }}
              />
              <Typography variant="caption" align="center" mt={1}>
                Back
              </Typography>
            </Box>
          </label>
          <label htmlFor="selfie_photo">
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <InputFile
                id="selfie_photo"
                control={control}
                name="selfie_photo"
                children={({ value, error }) => {
                  return <UploadBox error={!!error} image={value?.preview} component="img" />;
                }}
              />
              <Typography variant="caption" align="center" mt={1}>
                Your Selfie
              </Typography>
            </Box>
          </label>
        </Stack>
      </>
      <Box mt={3}>
        <ButtonOutline sx={{ width: "15%", mr: 2 }} title="BACK" onClick={onBack} />
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

const UploadBox = styled(CardMedia)(({ theme, error }) => ({
  width: 100,
  height: 100,
  borderRadius: 10,
  outline: "none",
  backgroundColor: theme.palette.grey[400],
  border: `3px solid ${error ? theme.palette.error["light"] : theme.palette.grey[400]}`
}));

export const FormKYC = {
  S1: S1,
  S2: S2,
  S3: S3
};

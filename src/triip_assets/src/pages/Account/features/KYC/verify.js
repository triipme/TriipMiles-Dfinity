import React, { useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { FormKYC } from "../../form";
import { useForm, useFormState } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUploadFile } from "../../../../hooks";
import { customAlphabet } from "nanoid";

function nameBucket({ uid, img }) {
  return `${
    process.env.NODE_ENV === "development" ? "development" : "production" || "production"
  }/${uid}/kyc/${customAlphabet(img?.name ?? process.env.NANOID_ALPHABET_S3, 16)()}.${
    img?.type.split("/")[1]
  }`;
}

const Verify = () => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm();
  const [image, setFile] = useUploadFile();
  const { actor, profile } = useSelector(state => state.user);
  const [step, setStep] = useState(1);
  const handleS1 = () => {
    setStep(2);
  };
  const handleS2 = async data => {
    const { fname, lname, front_photo, back_photo, selfie_photo, ...all } = data;
    const images = [
      { ...front_photo, name: nameBucket({ uid: profile._id, img: front_photo.file }) },
      { ...back_photo, name: nameBucket({ uid: profile._id, img: back_photo.file }) },
      { ...selfie_photo, name: nameBucket({ uid: profile._id, img: selfie_photo.file }) }
    ];
    try {
      if (!!actor?.createKYC) {
        const rs = await actor.createKYC({
          info: {
            ...all,
            name: `${fname} ${lname}`
          },
          images: images.map(img => img.name),
          comments: []
        });
        if ("ok" in rs) {
          setStep(3);
          console.time("kyc up");
          await Promise.all(
            images.map(async img => {
              setFile(img);
            })
          );
          console.timeEnd("kyc up");
        } else {
          throw rs.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleS3 = () => {};
  return (
    <Box>
      {console.count("re-render kyc")}
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
          1: <FormKYC.S1 control={control} handleS1={handleSubmit(handleS1)} />,
          2: (
            <FormKYC.S2
              control={control}
              handleS2={handleSubmit(handleS2)}
              onBack={() => setStep(1)}
            />
          ),
          3: <FormKYC.S3 control={control} handleS3={handleS3} />
        }[step]
      }
    </Box>
  );
};
export default Verify;

import React from "react";
import { Stack, Box, Typography } from "@mui/material";

export const Empty = () => {
  return (
    <Stack justifyContent="center" width="100%" height={300}>
      <Typography align="center" variant="h5">
        Empty.
      </Typography>
    </Stack>
  );
};

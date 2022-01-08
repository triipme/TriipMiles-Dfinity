import React from "react";
import { Box, Typography } from "@mui/material";
import Page from "../../pages/Admin/components/Page";
import { Images } from "../../theme";

const Loading = ({ height }) => {
  return (
    <Box
      width="100%"
      display="grid"
      height={height ?? "90vh"}
      sx={{ textAlign: "center", placeContent: "center" }}>
      <Box component="img" src={Images.logo} maxWidth={70} />
      <Typography variant="h6" mt={2}>
        Loading
      </Typography>
    </Box>
  );
};
export default Loading;

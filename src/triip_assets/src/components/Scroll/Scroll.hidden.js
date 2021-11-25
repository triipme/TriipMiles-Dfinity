import { Box } from "@mui/system";
import React from "react";
import { Scroll } from "./Scroll";

const ScrollHidden = ({ children, sx }) => {
  return (
    <Scroll>
      <Box sx={{ width: "100%", height: "100%", ...sx }}>{children}</Box>
    </Scroll>
  );
};

export default ScrollHidden;

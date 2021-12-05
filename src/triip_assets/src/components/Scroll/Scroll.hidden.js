import { Box } from "@mui/system";
import React from "react";
import SimpleBarReact from "simplebar-react";

const ScrollHidden = ({ children, sx }) => {
  return (
    <SimpleBarReact style={{ maxHeight: 500 }}>
      <Box sx={{ my: 2, px: 2, width: "100%", height: 500 - 32, ...sx }}>{children}</Box>
    </SimpleBarReact>
  );
};

export default ScrollHidden;

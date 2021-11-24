import React from "react";

import PropTypes from "prop-types";
// material
import { Box } from "@mui/material";
import { Images } from "../../../theme";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={Images.logo} sx={{ width: 40, height: 40, ...sx }} />;
}

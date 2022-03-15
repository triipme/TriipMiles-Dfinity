import { Button, Tab, Box } from "@mui/material";
import { styled } from "@mui/system";
import { ImageUrls } from "../../theme";

export const ContentModalStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: 400
  },
  width: "90%",
  height: 500,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  backgroundColor: theme.palette.white.main,
  borderRadius: 20,
  outline: "none"
}));

export const Banner = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    height: 300
  },
  // [theme.breakpoints.up("md")]: {
  //   height: 300
  // },
  [theme.breakpoints.up("lg")]: {
    height: 500
  },
  height: 200,
  backgroundSize: "auto 100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
}));

export const StepItemImage = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  [theme.breakpoints.up("md")]: {
    maxHeight: 230
  },
  [theme.breakpoints.up("sm")]: {
    maxHeight: 200
  },
  maxHeight: 300,
  margin: "50px auto",
  objectFit: "contain"
}));

export const TabStyled = styled(Tab)(({ theme }) => ({
  height: 70,
  fontSize: 24,
  borderRadius: "10px 10px 0 0",
  "&.Mui-selected": {
    color: "black",
    backgroundColor: theme.palette.primary.main
  },
  "&.Mui-focusVisible": {
    backgroundColor: "black"
  }
}));

export const TabPanelButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "60%"
  },
  width: "100%",
  height: 60,
  fontSize: 24,
  fontWeight: "bold",
  borderRadius: 24,
  color: theme.palette.white.main,
  backgroundColor: theme.palette.primary.main
}));

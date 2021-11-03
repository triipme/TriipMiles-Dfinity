import { Button, Tab } from "@mui/material";
import { styled } from "@mui/system";
import { ImageUrls } from "../../theme";

export const ContentModalStyled = styled("div")(({ theme }) => ({
  width: "35%",
  height: "80%",
  padding: 25,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  backgroundColor: theme.palette.white.main,
  // borderRadius: 20,
  overflowY: "scroll"
}));

export const Banner = styled("div")`
  width: 100%;
  height: 500px;
  background-size: auto 100%;
  background-repeat: no-repeat;
`;

export const StepItemImage = styled("img")`
  width: auto;
  height: 230px;
  margin: 50px auto;
  object-fit: contain;
`;

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
  width: "100%",
  height: 70,
  fontSize: 28,
  fontWeight: "bold",
  borderRadius: 24,
  color: theme.palette.white.main,
  backgroundColor: theme.palette.primary.main
}));

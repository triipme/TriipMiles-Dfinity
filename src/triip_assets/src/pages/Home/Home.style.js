import { styled } from "@mui/system";

export const ContentModalStyled = styled("div")(({ theme }) => ({
  width: "35%",
  height: "80%",
  padding: 25,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  backgroundColor: theme.palette.white.main,
  borderRadius: 20,
  overflowY: "scroll"
}));

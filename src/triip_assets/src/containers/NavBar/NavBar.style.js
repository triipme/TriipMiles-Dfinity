import { Container, Modal } from "@mui/material/index";
import { styled } from "@mui/system";
export const ContainerStyled = styled(Container)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 0",
  backgroundColor: theme.palette.white.main,
  boxShadow: "0 0 50px 5px #f0f0f0"
}));
export const FormStyled = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "35%"
  },
  width: "100%",
  height: "80%",
  padding: 25,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  backgroundColor: theme.palette.white.main,
  borderRadius: 20
}));

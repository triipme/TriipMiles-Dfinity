import { Container, Modal } from "@mui/material/index";
import { styled } from "@mui/system";
export const ContainerStyled = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: white;
  box-shadow: 0 0 50px 5px #f0f0f0;
`;
export const FormStyled = styled("div")(({ theme }) => ({
  width: "35%",
  height: "80%",
  padding: 25,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  backgroundColor: theme.palette.white.main,
  borderRadius: 20
}));

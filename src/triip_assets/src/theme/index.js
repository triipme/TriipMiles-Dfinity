import { createTheme, responsiveFontSizes } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 16
  }
});
export default responsiveFontSizes(theme);

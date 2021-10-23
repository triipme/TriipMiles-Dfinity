import { createTheme, responsiveFontSizes } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#48C2CA"
    },
    secondary: {
      main: "#FAB84B"
    }
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 16
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 20px",
          color: "#fff",
          borderRadius: 10,
          boxShadow: "none"
        }
      }
    }
  }
});
export default responsiveFontSizes(theme);

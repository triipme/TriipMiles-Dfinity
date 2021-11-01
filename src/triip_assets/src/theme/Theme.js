import { createTheme, responsiveFontSizes } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#48C2CA"
    },
    secondary: {
      main: "#FAB84B"
    },
    white: {
      main: "#fff"
    }
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 16
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "primary" },
          style: {
            padding: "8px 20px",
            color: "#fff",
            borderRadius: 12,
            boxShadow: "none",
            fontWeight: "bold",
            backgroundColor: "#48C2CA",
            "&:hover": {
              backgroundColor: "#FAB84B"
            }
          }
        },
        {
          props: { variant: "secondary" },
          style: {
            padding: "8px 20px",
            color: "#fff",
            borderRadius: 12,
            boxShadow: "none",
            fontWeight: "bold",
            backgroundColor: "#FAB84B"
          }
        }
      ]
    }
  }
});
export default responsiveFontSizes(theme);

// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
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
      ],
      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none"
          }
        },
        sizeLarge: {
          height: 48
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          "&:hover": {
            backgroundColor: theme.palette.grey[400]
          }
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover
          }
        },
        textInherit: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover
          }
        }
      }
    }
  };
}

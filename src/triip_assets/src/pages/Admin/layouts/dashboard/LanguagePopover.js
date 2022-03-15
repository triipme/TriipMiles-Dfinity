import React, { useRef, useState } from "react";
// material
import { alpha } from "@mui/material/styles";
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
import { Images } from "../../../../theme";

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: "en",
    label: "English",
    icon: Images.admin.icons.flags.en
  },
  {
    value: "de",
    label: "German",
    icon: Images.admin.icons.flags.de
  },
  {
    value: "fr",
    label: "French",
    icon: Images.admin.icons.flags.fr
  }
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}>
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {LANGS.map(option => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={handleClose}
              sx={{ py: 1, px: 2.5 }}>
              <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}

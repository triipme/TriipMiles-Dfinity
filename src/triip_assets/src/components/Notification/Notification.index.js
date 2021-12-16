import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import { ToastBar, Toaster, useToaster } from "react-hot-toast";

export const Notification = () => {
  const theme = useTheme();
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;
  return (
    // <div
    //   onMouseEnter={startPause}
    //   onMouseLeave={endPause}
    //   style={{
    //     position: "fixed",
    //     zIndex: 999,
    //     top: 70,
    //     right: 20
    //   }}>
    //   {toasts
    //     .filter(toast => toast.visible)
    //     .map(toast => (
    //       <Box
    //         key={toast.id}
    //         {...toast.ariaProps}
    //         sx={{
    //           backgroundColor: theme.palette.primary.main,
    //           padding: "10px 20px",
    //           mb: 1,
    //           borderRadius: 100,
    //           boxShadow: theme.shadows[20]
    //         }}>
    //         <Typography color={theme.palette.white.main}>{(toast.type, toast.message)}</Typography>
    //       </Box>
    //     ))}
    // </div>
    <Toaster position="top-right" containerStyle={{ top: 70, zIndex: 1500 }}>
      {t => (
        <ToastBar
          style={{
            padding: "8px 20px",
            borderRadius: 100,
            boxShadow: theme.shadows[20]
          }}
          toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              <Typography>{message}</Typography>
              {t.type !== "loading" && <></>}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

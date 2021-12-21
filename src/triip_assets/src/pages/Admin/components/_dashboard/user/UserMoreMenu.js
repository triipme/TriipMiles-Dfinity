import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink } from "react-router-dom";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
  TextareaAutosize,
  Stack
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { ContentModalStyled } from "../../../../Home/Home.style";
import { ButtonPrimary, ScrollHidden } from "../../../../../components";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";

// ----------------------------------------------------------------------

export default function UserMoreMenu({ id_proof, proof, allow_approve }) {
  const ref = useRef(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();
  const theme = useTheme();
  const [isReject, setIsReject] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { actor, actor_transfer } = useSelector(state => state.user);
  const handleApprove = async () => {
    try {
      if (!!actor?.approveHP_admin) {
        console.log(id_proof, "approved", proof[0]);
        const aid = await actor?.approveHP_admin(id_proof, "approved", proof[0]);
        if ("ok" in aid) {
          console.log(aid?.ok[0]);
          const result_transfer = await actor_transfer?.transfer(["ptp_approve"], aid?.ok[0][0]);
          toast.success("Approved");
          if ("Ok" in result_transfer) toast.success("Send 0.000033 ICP", { duration: 10000 });
          else throw result_transfer?.Err;
        } else {
          throw aid?.err;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };
  const handleReject = data => {
    (async () => {
      try {
        if (!!actor?.approveHP_admin) {
          console.log(id_proof, "rejected", proof[0]);
          const aid = await actor?.approveHP_admin(
            id_proof,
            `rejected ${data.reject_reason}`,
            proof[0]
          );
          if ("ok" in aid) {
            toast.success("Rejected");
            reset();
          } else {
            throw aid?.err;
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsReject(!isReject);
      }
    })();
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      {allow_approve && (
        <Menu
          open={isOpen}
          anchorEl={ref.current}
          onClose={() => setIsOpen(false)}
          PaperProps={{
            sx: { width: 200, maxWidth: "100%" }
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}>
          <MenuItem sx={{ color: "text.secondary" }} onClick={handleApprove}>
            <ListItemIcon>
              <Icon
                icon="dashicons:yes"
                width={24}
                height={24}
                color={theme.palette.success.main}
              />
            </ListItemIcon>
            <ListItemText primary="Approve" primaryTypographyProps={{ variant: "body2" }} />
          </MenuItem>

          <MenuItem
            component={RouterLink}
            to="#"
            sx={{ color: "text.secondary" }}
            onClick={() => setIsReject(!isReject)}>
            <ListItemIcon>
              <Icon
                icon="dashicons:no-alt"
                width={24}
                height={24}
                color={theme.palette.error.main}
              />
            </ListItemIcon>
            <ListItemText primary="Reject" primaryTypographyProps={{ variant: "body2" }} />
          </MenuItem>
        </Menu>
      )}
      <Modal open={isReject}>
        <ContentModalStyled>
          <ScrollHidden>
            <Typography variant="h4">Reject Travel Plan</Typography>
            <Typography variant="body2">REJECTION REASON</Typography>
            <Controller
              name="reject_reason"
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { name, value, onChange }, fieldState: { error } }) => (
                <>
                  <TextareaStyled
                    aria-label="empty textarea"
                    placeholder="Enter..."
                    value={value}
                    onChange={onChange}
                  />
                </>
              )}
            />
            <Stack flexDirection="row">
              <ButtonPrimary
                title="Submit"
                loading={isSubmitting}
                variant="outline"
                onClick={handleSubmit(handleReject)}
              />
              <ButtonPrimary title="Back" sx={{ ml: 1 }} onClick={() => setIsReject(!isReject)} />
            </Stack>
          </ScrollHidden>
        </ContentModalStyled>
      </Modal>
    </>
  );
}
const TextareaStyled = styled(TextareaAutosize)(({ theme }) => ({
  minWidth: "100%",
  maxWidth: "100%",
  minHeight: 100,
  marginTop: 20,
  padding: 12,
  outline: "none",
  borderRadius: 12
}));

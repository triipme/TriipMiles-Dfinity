import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kycRejectReasonThunk } from "../../../slice/static/staticSlice";
import moment from "moment";
import { useForm } from "react-hook-form";
import { ERRORS } from "../../../utils/constants";
import { InputText } from "../../../components";

function Kycs() {
  const [open, setOpen] = useState();
  const [listKYCs, setListKYCs] = useState([]);
  const dispatch = useDispatch();
  const { actor } = useSelector(state => state.user);
  const handleOpen = uid => {
    setOpen(uid);
  };
  const { reject_reasons } = useSelector(state => state.static.kyc);

  const handleClose = () => setOpen();

  const modalKyc = useMemo(() => {
    return listKYCs.find(kyc => kyc[0].toString() === open);
  }, [open]);
  async function KYCs() {
    try {
      if (!!actor?.listKYCs) {
        const rs_list = await actor.listKYCs();
        if ("ok" in rs_list) {
          setListKYCs(rs_list.ok);
        } else {
          throw rs_status.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    KYCs();
    dispatch(kycRejectReasonThunk());
  }, []);
  console.log(listKYCs);
  const renderCmt = (cmt, updatedAt) => {
    const r = reject_reasons.find(reason => reason.id.toString() === cmt);
    if (!!r) {
      return <p className="info-comments">{`${r.reason_name} - ${r.description}`}</p>;
    } else {
      return <p className="info-comments">{cmt}</p>;
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Grid
          className="infor-manual"
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell align="left">INFO</TableCell>
                <TableCell align="left">KYC</TableCell>
                <TableCell align="left">COMMENTS</TableCell>
                <TableCell align="left">KYC APPROVE AT</TableCell>
                <TableCell align="left">KYC SUBMIT AT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listKYCs?.map((item, item_i) => (
                <TableRow key={item[0].toString()} style={{ verticalAlign: "top" }}>
                  <TableCell align="left">{item_i}</TableCell>
                  <TableCell align="left">
                    <p className="code" style={{ marginTop: 0 }}>
                      Code : {item[1].info.id_number}
                    </p>
                    <p className="name">Name : {item[1].info.name}</p>
                    <p className="email">Contact Email : {item[1].info.email}</p>
                    <p className="phone">Phone : {item[1].info.phone}</p>
                    <p className="country">Country : {item[1].info.country} </p>
                    <p className="citiz">Citizenship : {item[1].info.citizenship}</p>
                    <p className="addr">Address : {item[1].info.address}</p>
                  </TableCell>
                  <TableCell align="left">
                    <p className="type-img" style={{ minWidth: "220px", marginTop: 0 }}>
                      Type : {item[1].info.id_type}
                    </p>
                    <div className="img_user" style={{ display: "flex", marginTop: 0 }}>
                      <img
                        style={{ width: "80px", height: "60px" }}
                        src="data:image/jpeg;base64,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"
                        alt="img"
                      />
                      <img
                        style={{ width: "80px", height: "60px" }}
                        src="data:image/jpeg;base64,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"
                        alt="img"
                      />
                      <img
                        style={{ width: "80px", height: "60px" }}
                        src="data:image/jpeg;base64,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"
                        alt="img"
                      />
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    {moment.unix(parseInt(item[1].updatedAt[0] / BigInt(1e9))).format("LL")}
                    {renderCmt(item[1].comments[0], item[1].updatedAt[0])}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() =>
                        // handleOpen(item[0].toString())
                        item[1].status[0] === "rejected" ? {} : handleOpen(item[0].toString())
                      }
                      style={{
                        backgroundColor: item[1].status[0] === "rejected" ? "red" : "#40d9ca"
                      }}
                      variant="contained"
                      className="info-btn">
                      {item[1].status[0] === "rejected" ? "Rejected" : "Approve"}
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <p>{moment.unix(parseInt(item[1].createdAt[0] / BigInt(1e9))).format("LL")}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </TableContainer>

      <ModalKyc open={open} handleClose={handleClose} modalKyc={modalKyc} refresh={KYCs} />
    </>
  );
}

const ModalKyc = ({ open, handleClose, modalKyc, refresh }) => {
  const { actor } = useSelector(state => state.user);
  const { control, handleSubmit } = useForm();
  const { reject_reasons } = useSelector(state => state.static.kyc);

  async function actorApproveKyc(type, comments) {
    try {
      if (!!actor.approveKYC) {
        const rs = await actor.approveKYC(type, comments);
        if ("ok" in rs) {
          refresh();
          handleClose();
        } else {
          throw rs.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleApprove = () => {
    actorApproveKyc("approved", "");
  };
  const handleReject = body => {
    const { comments, other_reason } = body;
    let cmt = comments.trim().split(" - ").splice(0, 1)[0] || other_reason;
    actorApproveKyc("rejected", cmt);
  };

  return (
    <Modal
      open={!!open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" component={"span"} style={bold}>
          KYC {modalKyc?.[1].info.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 1 }} component={"span"}>
          <Grid container columns={12} spacing={2} style={{ marginBottom: "20px" }}>
            <Grid className="info_detail-personal" item xs={6}>
              <p className="code" style={{ marginTop: 0 }}>
                Code : {modalKyc?.[1].info.id_number}
              </p>
              <p className="name">Name : {modalKyc?.[1].info.name}</p>
              <p className="email">Contact Email : {modalKyc?.[1].info.email}</p>
              <p className="phone">Phone : {modalKyc?.[1].info.phone}</p>
            </Grid>
            <Grid className="info_detail-personal" item xs={6}>
              <p className="country">Country : {modalKyc?.[1].info.country} </p>
              <p className="citiz">Citizenship : {modalKyc?.[1].info.citizenship}</p>
              <p className="addr">Address : {modalKyc?.[1].info.address}</p>
            </Grid>
          </Grid>
          <Grid container row={12} style={{ marginBottom: "20px" }}>
            <Grid item xs={12}>
              <InputText
                control={control}
                label="KYC ID NUMBER (UNIQUE)"
                disabled
                defaultValue={modalKyc?.[1].info.id_number}
                helperTextError={ERRORS}
                name="kyc_number"
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                control={control}
                label="*KYC REJECT REASON"
                rules={{
                  required: false
                }}
                helperTextError={ERRORS}
                name="comments"
                autocompleteOptions={reject_reasons?.map(
                  c => `${c.id} - ${c.reason_name} - ${c.description}`
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                control={control}
                rules={{
                  required: false
                }}
                label="OTHER REASON"
                helperTextError={ERRORS}
                name="other_reason"
              />
            </Grid>
          </Grid>

          <Grid>
            <Grid>
              <p style={bold}> Front</p>
              <img
                style={{ width: "80%", height: "300px" }}
                src="data:image/jpeg;base64,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"
                alt="img"
              />
            </Grid>
            <Grid>
              <p style={bold}> Back</p>

              <img
                style={{ width: "80%", height: "300px" }}
                src="data:image/jpeg;base64,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"
                alt="img"
              />
            </Grid>
            <Grid>
              <p style={bold}> Selfie</p>
              <img
                style={{ width: "80%", height: "300px" }}
                src="data:image/jpeg;base64,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"
                alt="img"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
            <Grid item xs={12} align="right">
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="success"
                onClick={handleApprove}>
                Approve
              </Button>
              <Button variant="contained" color="error" onClick={handleSubmit(handleReject)}>
                Reject
              </Button>
            </Grid>
          </Grid>
        </Typography>
      </Box>
    </Modal>
  );
};

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  zIndex: 1000,
  overflowY: "auto",
  maxHeight: "calc(100vh - 100px)"
};

const bold = {
  fontWeight: "700",
  fontSize: "20px"
};

export default Kycs;

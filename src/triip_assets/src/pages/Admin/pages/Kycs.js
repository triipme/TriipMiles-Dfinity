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
import Page from "../components/Page";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kycRejectReasonThunk } from "../../../slice/static/staticSlice";
import moment from "moment";
import { useForm } from "react-hook-form";
import { ERRORS } from "../../../utils/constants";
import { InputText } from "../../../components";
import { useGetFile } from "../../../hooks";

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
  const renderCmt = (cmt, updatedAt) => {
    const r = reject_reasons.find(reason => reason.id.toString() === cmt);
    if (!!r) {
      return <p className="info-comments">{`${r.reason_name} - ${r.description}`}</p>;
    } else {
      return <p className="info-comments">{cmt}</p>;
    }
  };
  return (
    <Page title="KYC | Triip Admin">
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
                      {item[1].images.map(img => (
                        <KycImg key={img} url={img} style={{ width: "80px", height: "60px" }} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    {moment.unix(parseInt(item[1].updatedAt[0] / BigInt(1e9))).format("LL")}
                    {renderCmt(item[1].comments[0], item[1].updatedAt[0])}
                  </TableCell>
                  {console.log(item[1].status[0])}
                  <TableCell align="left">
                    <Button
                      onClick={() =>
                        // handleOpen(item[0].toString())
                        ["rejected", "approved"].includes(item[1].status[0])
                          ? {}
                          : handleOpen(item[0].toString())
                      }
                      style={{
                        backgroundColor: {
                          "rejected": "red",
                          "approved": "green",
                          "waiting": "#40d9ca",
                          "new": "#40d9ca",
                          [""]: "#40d9ca"
                        }[item[1].status[0]]
                      }}
                      variant="contained"
                      className="info-btn">
                      {
                        {
                          "rejected": "Rejected",
                          "approved": "Approved",
                          "waiting": "Approve",
                          "new": "Approve",
                          [""]: "Approve"
                        }[item[1].status[0]]
                      }
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
    </Page>
  );
}

const ModalKyc = ({ open, handleClose, modalKyc, refresh }) => {
  const { actor } = useSelector(state => state.user);
  const { control, handleSubmit } = useForm();
  const { reject_reasons } = useSelector(state => state.static.kyc);
  console.log(open);
  async function actorApproveKyc(type, comments) {
    try {
      if (!!actor.approveKYC) {
        const rs = await actor.approveKYC(type, comments, open);
        console.log(rs);
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
            {modalKyc?.[1].images.map((img, img_i) => (
              <Grid key={img}>
                <p style={bold}>{{ 0: "Front", 1: "Back", 2: "Selfie" }[img_i]}</p>
                <KycImg url={img} style={{ width: "80%", height: "300px" }} />
              </Grid>
            ))}
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

const KycImg = ({ url, ...props }) => {
  const [image] = useGetFile(url);
  return <img {...props} src={image.image} alt="img" />;
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

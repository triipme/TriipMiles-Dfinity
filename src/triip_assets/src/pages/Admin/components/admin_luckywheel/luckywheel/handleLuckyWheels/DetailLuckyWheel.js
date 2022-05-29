import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { Link } from "react-router-dom";
import "../../prizes/Prizes.css";
import "../LuckyWheels.css";
import AddLuckyWheelButton from "./AddLuckyWheelsButton";

function DetailLuckyWheel() {
  return (
    <div className="prizes_content">
      <AddLuckyWheelButton />
      <div className="luckywheel_wrapper">
        <div className="luckywheel_header">
          <div className="luckywheel_title">LUCKY WHEEL #4</div>
        </div>
        <div className="active_container">
          <div className="active_wheels">
            <p>Id : 2</p>
            <p>Name : test staging</p>
            <p>Max spin times : 3</p>
            <p>Max spin buy times : 1</p>
            <p>Price of spin : 5.0</p>
            <p>Created at : 12/07/2019 18:34:58</p>
            <p>Activated at : 11/05/2022 18:20:10</p>
            <p>Prizes</p>
          </div>
          <TableContainer className="prizes_container" component={Paper}>
            <Grid
              className="infor_manual"
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start">
              {/* Prizes pagination and data infor */}

              {/* Table Content List */}
              <Table size="small" className="prizes_table">
                <TableHead>
                  <TableRow>
                    <TableCell className="table_title" align="left">
                      #
                    </TableCell>
                    <TableCell className="table_title" align="left">
                      ICON
                    </TableCell>
                    <TableCell className="table_title" align="left">
                      ICON
                    </TableCell>
                    <TableCell className="table_title" align="left">
                      QUANTITY
                    </TableCell>
                    <TableCell className="table_title" align="left">
                      PERCENTAGE
                    </TableCell>
                    <TableCell className="table_title" align="left">
                      CAP PER USER PER MONTH
                    </TableCell>
                    <TableCell className="table_title" align="left">
                      CAP PER MONTH
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* Table Content Item */}

                <TableBody className="table_container">
                  <TableRow style={{ verticalAlign: "center" }}>
                    <TableCell className="table_item" align="left">
                      38
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <p className="locale_en">Dream Triip To Bhutan</p>
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <div style={{ maxWidth: "108px" }}>
                        <img
                          style={{ width: "85px" }}
                          src="https://triip-staging.imgix.net/triipme/staging/prize/icon/36/type-a-retreat-2016-facebook-banner.jpg"
                          alt="img"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <p className="info-desc-en" style={{ marginBottom: "20px" }}>
                        1
                      </p>
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <p>1.0</p>
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <p>0</p>
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <p> 0</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody className="table_container">
                  <TableRow style={{ verticalAlign: "center" }}>
                    <TableCell className="table_item" align="left">
                      38
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <p className="locale_en" style={{ marginBottom: "20px" }}>
                        Dream Triip To Bhutan
                      </p>
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <div style={{ maxWidth: "108px" }}>
                        <img
                          style={{ width: "85px" }}
                          src="https://triip-staging.imgix.net/triipme/staging/prize/icon/36/type-a-retreat-2016-facebook-banner.jpg"
                          alt="img"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <p className="info-desc-en" style={{ marginBottom: "20px" }}>
                        1
                      </p>
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <p>1.0</p>
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <p>0</p>
                    </TableCell>
                    <TableCell className="table_item" align="left">
                      <p> 0</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <div className="footter_edit">
              <Link to="/triip-admin/dashboard/admin_luckywheel">
                <button className="btn btn_cancel">Back</button>
              </Link>

              <button className="btn btn_deactivate">Deactivate</button>
            </div>
          </TableContainer>
        </div>
      </div>
      {/* Table  LuckWheels */}
    </div>
  );
}

export default DetailLuckyWheel;

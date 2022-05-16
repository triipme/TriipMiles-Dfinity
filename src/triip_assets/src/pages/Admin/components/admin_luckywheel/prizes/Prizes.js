import React from "react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./Prizes.css";
import AddPrizeItem from "./handlePrizes/AddPrizesButton";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import PaginationPrizes from "./handlePrizes/PaginationPrizes";

function Prizes() {
  return (
    <>
      <div className="prizes_content">
        <AddPrizeItem />
        {/* Table  Prizes */}
        <TableContainer className="prizes_container" component={Paper}>
          <Grid
            className="infor_manual"
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start">
            {/* Prizes pagination and data infor */}
            <PaginationPrizes />
            {/* Table Content List */}
            <Table size="small" className="prizes_table">
              <TableHead>
                <TableRow>
                  <TableCell className="table_title" align="left">
                    #
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    TITLE
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    ICON
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    DESCRIPTION
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    QUANTITY
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    CREATED AT
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    ACTIONS
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
                    <p className="locale_en" style={{ marginBottom: "20px" }}>
                      Locale en: Triip T-Shirt
                    </p>
                    <p className="locale_vi">Locale vi: Áo thun T-Shirt</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <div style={{ maxWidth: "108px" }}>
                      <img
                        style={{ width: "85px" }}
                        src="https://triip-staging.imgix.net/triipme/staging/prize/icon/38/Asset_1.png"
                        alt="img"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p className="info-desc-en" style={{ marginBottom: "20px" }}>
                      Locale en: You got a Triip T-Shirt
                    </p>
                    <p className="info-desc-vi">Locale vi: Bạn nhận được 1 áo thun Triip</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>1</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>12/07/2019</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <a href="#">
                      <button className="btn_actions btn_edit">
                        <Icon icon="clarity:note-edit-line" />
                      </button>
                    </a>
                    <a href="#">
                      <button className="btn_actions btn_delete">
                        <Icon icon="ep:delete" />
                      </button>
                    </a>
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
                      Locale en: +88 TIIM
                    </p>
                    <p className="locale_vi">Locale vi: +88 TIIM</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <div style={{ maxWidth: "108px" }}>
                      <img
                        style={{ width: "85px" }}
                        src="	https://triip-staging.imgix.net/triipme/staging/prize/icon/35/triipmiles__1_.jpg"
                        alt="img"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p className="info-desc-en" style={{ marginBottom: "20px" }}>
                      Locale en: You've earned 88 TIIM in your TriipMiles wallet
                    </p>
                    <p className="info-desc-vi">
                      Locale vi: Bạn đã nhận được 88 TIIM vào ví TriipMiles
                    </p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>88</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>12/07/2019</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <Link to="/triip-admin/dashboard/admin_luckywheel/prizes/edit">
                      <button className="btn_actions btn_edit">
                        <Icon icon="clarity:note-edit-line" />
                      </button>
                    </Link>
                    <a href="#">
                      <button className="btn_actions btn_delete">
                        <Icon icon="ep:delete" />
                      </button>
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <PaginationPrizes />
          </Grid>
        </TableContainer>
      </div>
    </>
  );
}
export default Prizes;

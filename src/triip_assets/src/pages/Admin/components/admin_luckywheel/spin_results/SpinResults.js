import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../prizes/Prizes.css";
import PaginationPrizes from "../prizes/handlePrizes/PaginationPrizes";
import "./spin_result.css";

export default function SpinResults() {
  const [toggleActive, setToggleActive] = useState("block");
  const handleToggleActiveUp = () => {
    setToggleActive("none");
  };
  const handleToggleActiveDown = () => {
    setToggleActive("block");
  };
  return (
    <>
      <div className="prizes_content">
        <div className="luckywheel_wrapper">
          <div className="luckywheel_header">
            <div className="luckywheel_title">FILTERS</div>
            <div className="luckywheel_control">
              <Icon
                icon="dashicons:arrow-up-alt2"
                onClick={handleToggleActiveUp}
                style={{ display: toggleActive }}
                className="luckywheel_control_arrow"
              />
              <Icon
                icon="dashicons:arrow-down-alt2"
                className="luckywheel_control_arrow"
                onClick={handleToggleActiveDown}
                style={{ display: !toggleActive }}
                style={{ display: toggleActive === "block" ? "none" : "block" }}
              />
            </div>
          </div>
          <div className="filter_container" style={{ display: toggleActive }}>
            <div className="state_container">
              <div className="state_list">
                <p>STATE</p>
                <div className="state_item">
                  <input type="checkbox" name="" id="pending" />
                  <label htmlFor="pending">PENDING</label>
                </div>
                <div className="state_item">
                  <input type="checkbox" name="" id="processing" />
                  <label htmlFor="processing">PROCESSING</label>
                </div>
                <div className="state_item">
                  <input type="checkbox" name="" id="shipping" />
                  <label htmlFor="shipping">SHIPPING</label>
                </div>
                <div className="state_item">
                  <input type="checkbox" name="" id="completed" />
                  <label htmlFor="completed">COMPLETED</label>
                </div>
                <div className="state_item">
                  <input type="checkbox" name="" id="cannot_process" />
                  <label htmlFor="cannot_process">CANNOT PROCESS</label>
                </div>
              </div>
              <div className="state_input">
                <div className="input_item">
                  <input type="text" placeholder="Prize" />
                </div>
                <div className="input_item">
                  <input type="text" placeholder="User ID" />
                </div>
                <div className="input_item">
                  <input
                    type="text"
                    placeholder="Code, email, first & last_name"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="footer_filter">
            <button className="btn btn_submit">Search</button>
            <button className="btn btn_cancel">Reset</button>
          </div>
        </div>
        {/* Table  LuckWheels */}
      </div>
      <div className="prizes_content">
        {/* Table  Prizes */}
        <TableContainer className="prizes_container" component={Paper}>
          <Grid
            className="infor_manual"
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            {/* Prizes pagination and data infor */}
            <PaginationPrizes />
            {/* Table Content List */}
            <Table size="normal" className="prizes_table">
              <TableHead>
                <TableRow>
                  <TableCell className="table_title" align="left">
                    #
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    USER
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    PRIZE
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    STATE
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    REMARK
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    CREATED AT
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    UPDATE AT
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* Table Content Item */}

              <TableBody className="table_container">
                <TableRow style={{ verticalAlign: "center" }}>
                  <TableCell className="table_item" align="left">
                    2320
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>hav test 7</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>Sorry you didn’t win</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p className="info-desc-en">completed</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>[Auto Message] No need operation to process</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>06/11/2021 15:01:41</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>06/11/2021 15:01:41</p>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody className="table_container">
                <TableRow style={{ verticalAlign: "center" }}>
                  <TableCell className="table_item" align="left">
                    124
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>Q Hà Nguyễn </p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>+880 TIIM</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p className="info-desc-en">completed</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>[Auto Message] No need operation to process</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>16/01/2019 09:34:15</p>
                  </TableCell>
                  <TableCell className="table_item" align="left">
                    <p>16/01/2019 09:34:15</p>
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

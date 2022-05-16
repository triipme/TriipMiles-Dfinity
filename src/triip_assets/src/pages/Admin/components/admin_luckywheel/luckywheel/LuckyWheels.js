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
import "../prizes/Prizes.css";
import "./LuckyWheels.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import AddLuckyWheelButton from "./handleLuckyWheels/AddLuckyWheelsButton";

function LuckyWheels() {
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
        <AddLuckyWheelButton />
        <div className="luckywheel_wrapper">
          <div className="luckywheel_header">
            <div className="luckywheel_title">ACTIVE WHEEL</div>
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
          <div className="active_container" style={{ display: toggleActive }}>
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
                alignItems="flex-start"
              >
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
                        <p
                          className="info-desc-en"
                          style={{ marginBottom: "20px" }}
                        >
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
                        <p
                          className="locale_en"
                          style={{ marginBottom: "20px" }}
                        >
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
                        <p
                          className="info-desc-en"
                          style={{ marginBottom: "20px" }}
                        >
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
                <a href="">
                  <button className="btn btn_edit_lkw">
                    <Icon icon="fa-solid:eye" className="footter_edit_icon" />
                  </button>
                </a>
              </div>
            </TableContainer>
          </div>
        </div>
        {/* Table  LuckWheels */}
      </div>
      <div className="luckywheel_content_inactive">
        {/* <AddPrizeItem /> */}
        <div className="luckywheel_wrapper">
          <div className="luckywheel_header">
            <div className="luckywheel_title">INACTIVE WHEELS</div>
          </div>
          <div className="luckywheel_infor">
            <span>
              Displaying <strong>all 5</strong> lucky wheels
            </span>
          </div>
          <div className="active_container">
            <div className="active_wheels"></div>
            <TableContainer className="prizes_container" component={Paper}>
              <Grid
                className="infor_manual"
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
                {/* Prizes pagination and data infor */}

                {/* Table Content List */}
                <Table size="small" className="prizes_table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="table_title" align="left">
                        #
                      </TableCell>
                      <TableCell className="table_title" align="left">
                        NAME
                      </TableCell>
                      <TableCell className="table_title" align="left">
                        MAX SPIN TIMES
                      </TableCell>
                      <TableCell className="table_title" align="left">
                        MAX SPIN BUY TIMES
                      </TableCell>
                      <TableCell className="table_title" align="left">
                        PRICE OF SPIN
                      </TableCell>
                      <TableCell className="table_title" align="left">
                        CREATED AT
                      </TableCell>
                      <TableCell className="table_title" align="left">
                        UPDATED AT
                      </TableCell>
                      <TableCell className="table_title" align="left">
                        ACTIONS
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {/* Table Content Item */}

                  <TableBody className="table_container">
                    <TableRow
                      style={{ verticalAlign: "center", height: "70px" }}
                    >
                      <TableCell className="table_item" align="left">
                        4
                      </TableCell>
                      <TableCell className="table_item" align="justify">
                        <p className="locale_en">No Active Wheel</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <p>2</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <p>0</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <p>0.0</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <p>08/10/2020</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <p>30/03/2022</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <a href="#">
                          <button className="btn_actions btn_edit">
                            <Icon icon="clarity:note-edit-line" />
                          </button>
                        </a>
                        <a href="#">
                          <button className="btn_actions btn_activate">
                            Activate
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
                    <TableRow
                      style={{ verticalAlign: "center", height: "70px" }}
                    >
                      <TableCell className="table_item" align="left">
                        4
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <p className="locale_en">No Active Wheel</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <p>2</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <p>0</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <p>0.0</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <p>08/10/2020</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <p>30/03/2022</p>
                      </TableCell>
                      <TableCell className="table_item" align="left">
                        <a href="#">
                          <button className="btn_actions btn_edit">
                            <Icon icon="clarity:note-edit-line" />
                          </button>
                        </a>
                        <a href="#">
                          <button className="btn_actions btn_activate">
                            Activate
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
                </Table>
              </Grid>
              <div className="luckywheel_infor">
                <span>
                  Displaying <strong>all 5</strong> lucky wheels
                </span>
              </div>
            </TableContainer>
          </div>
        </div>
        {/* Table  LuckWheels */}
      </div>
    </>
  );
}
export default LuckyWheels;

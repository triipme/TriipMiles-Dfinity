import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import moment from "moment";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./LuckyWheel.css";
import "../prize/Prize.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import AddLuckyWheelBtn from "./AddLuckyWheelBtn";

const LuckyWheels = () => {
  const { actor } = useSelector(state => state.user);
  const [toggleActive, setToggleActive] = useState("block");
  const handleToggleActiveUp = () => {
    setToggleActive("none");
  };
  const handleToggleActiveDown = () => {
    setToggleActive("block");
  };
  const [wheelList, setWheelList] = useState([]);
  async function getWheels() {
    try {
      if (!!actor?.listWheels) {
        const list = await actor.listWheels();
        if ("ok" in list) {
          setWheelList(list.ok);
        } else {
          throw list.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getWheels();
  }, []);
  console.log(wheelList);
  return (
    <>
      <div className="prizes_content">
        <AddLuckyWheelBtn />
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
                        TITLE
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
                <Link to="/triip-admin/dashboard/admin_luckywheel/2">
                  <button className="btn btn_edit_lkw">
                    <Icon icon="fa-solid:eye" className="footter_edit_icon" />
                  </button>
                </Link>
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
                      <TableCell className="table_title" align="left" style={{ width: "17%" }}>
                        #
                      </TableCell>
                      <TableCell className="table_title" align="left" style={{ width: "15%" }}>
                        NAME
                      </TableCell>
                      <TableCell className="table_title" align="left" >
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
                    {wheelList?.map((wheel, _key) => (
                      <RenderWheel wheel={wheel} />
                    ))}
                  </TableBody>
                </Table>
              </Grid>
             
            </TableContainer>
          </div>
        </div>
        {/* Table  LuckWheels */}
      </div>
    </>
  );
};

const RenderWheel = ({ wheel }) => {
  console.log(wheel);
  return (
    <TableRow key={wheel?.uuid} style={{ verticalAlign: "center", height: "70px" }}>
      <TableCell key={`uuid-${wheel?.uuid}`} className="table_item" align="left" >
        {wheel?.uuid}
      </TableCell>
      <TableCell key={`name-${wheel?.uuid}`} className="table_item" align="left" >
        <p>
          {wheel?.name}
        </p>
      </TableCell>
      <TableCell key={`max_spin_times-${wheel?.uuid}`} className="table_item" align="left" >
        <p>
          {parseInt(wheel?.max_spin_times)}
        </p>
      </TableCell>
      <TableCell key={`max_buy_spin_times-${wheel?.uuid}`} className="table_item" align="left" >
        <p>
          {parseInt(wheel?.max_buy_spin_times)}
        </p>
      </TableCell>
      <TableCell key={`price_of_spin-${wheel?.uuid}`} className="table_item" align="left" >
        <p>
          {wheel?.price_of_spin}
        </p>
      </TableCell>
      <TableCell key={`created_at-${wheel?.uuid}`} className="table_item" align="left" >
        <p>
          {moment.unix(parseInt(wheel?.created_at[0] / BigInt(1e9))).format("LL")}
        </p>
      </TableCell>
      <TableCell key={`updated_at-${wheel?.uuid}`} className="table_item" align="left" >
        <p>
        {moment.unix(parseInt(wheel?.updated_at[0] / BigInt(1e9))).format("LL")}
        </p>
      </TableCell>
      <TableCell className="table_item" align="left">
        <Link to={`/triip-admin/dashboard/wheels/edit/${wheel?.uuid}`} title="Edit Wheel">
          <button className="btn_actions btn_edit">
            <Icon icon="clarity:note-edit-line" />
          </button>
        </Link>
        <a href="#">
          <button className="btn_actions btn_delete">
            <Icon icon="ep:delete" />
          </button>
        </a>
        <a href="#">
          <button className="btn_actions btn_activate" style={{ width: "60%", marginBottom: "10px" }}>
            Activate
          </button>
        </a>
      </TableCell>
    </TableRow>
  )
};
export default LuckyWheels;
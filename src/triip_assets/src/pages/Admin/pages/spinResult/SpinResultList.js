import React from "react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../prize/Prize.css";
import Pagination from "../prize/Pagination";
import "./spinResult.css";
import "../prize/AddPrize.css";

export default function SpinResults() {
  const { actor } = useSelector(state => state.user);
  const [spinResultList, setSpinResultList] = useState([]);
  async function getSpinResults() {
    try {
      if (!!actor?.listSpinResults) {
        const list = await actor.listSpinResults();
        if ("ok" in list) {
          setSpinResultList(list.ok);
        } else {
          throw list.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSpinResults();
  }, []);

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
            <Pagination />
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
                {spinResultList?.map((spinResult, _key) => (
                  <RenderSpinResult spinResult={spinResult} />
                ))}
              </TableBody>
            </Table>
            <Pagination />
          </Grid>
        </TableContainer>
      </div>
    </>
  );
}

const RenderSpinResult = ({ spinResult }) => {
  console.log(spinResult);
  return (
    <TableRow key={spinResult?.uuid} style={{ verticalAlign: "center", height: "70px" }}>
      <TableCell key={`uuid-${spinResult?.uuid}`} className="table_item" align="left">
        {spinResult?.uuid}
      </TableCell>
      <TableCell key={`username-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
          {spinResult?.username}
        </p>
      </TableCell>
      <TableCell key={`prize_name-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
          {spinResult?.prize_name}
        </p>
      </TableCell>
      <TableCell key={`remark-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
          {spinResult?.remark}
        </p>
      </TableCell>
      <TableCell key={`state-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
          {spinResult?.state}
        </p>
      </TableCell>
      <TableCell key={`created_at-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
          {moment.unix(parseInt(spinResult?.created_at[0] / BigInt(1e9))).format("LL")}
        </p>
      </TableCell>
      <TableCell key={`updated_at-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
        {moment.unix(parseInt(spinResult?.updated_at[0] / BigInt(1e9))).format("LL")}
        </p>
      </TableCell>
    </TableRow>
  )
};
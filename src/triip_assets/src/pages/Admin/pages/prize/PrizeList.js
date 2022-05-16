import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./Prize.css";
import AddPrizeBtn from "./AddPrizeBtn";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Pagination from "./Pagination";

const PrizeList = () => {
  const [prizeList, setPrizeList] = useState([]);
  const { actor } = useSelector(state => state.user);
  async function getPrizes() {
    try {
      if (!!actor?.listPrizes) {
        const list = await actor.listPrizes();
        if ("ok" in list) {
          setPrizeList(list.ok);
        } else {
          throw list.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPrizes();
  }, []);
  return (
    <>
      <div className="prizes_content">
        <AddPrizeBtn />
        {/* Table  Prizes */}
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
                    NAME
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    ICON
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    QUANTITY
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    DESCRIPTION
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    CREATED AT
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* Table Content Item */}

              <TableBody className="table_container">
                {prizeList?.map((prize, _key) => (
                  <RenderPrize prize={prize} />
                ))}
              </TableBody>
            </Table>
          </Grid>
        </TableContainer>
      </div>
    </>
  );
};

const RenderPrize = ({ prize }) => {
  return (
    <TableRow key={prize?.uuid} style={{ verticalAlign: "center" }}>
      <TableCell key={`uuid-${prize?.uuid}`} className="table_item" align="left">
        {prize?.uuid}
      </TableCell>
      <TableCell key={`name-${prize?.uuid}`} className="table_item" align="left">
        <p className="locale_en" style={{ marginBottom: "20px" }}>
          {prize?.name}
        </p>
      </TableCell>
      <TableCell key={`icon-${prize?.uuid}`} className="table_item" align="left">
        <div style={{ maxWidth: "108px" }}>
          <img
            style={{ width: "85px" }}
            src={prize?.icon}
            alt="img"
          />
        </div>
      </TableCell>
      <TableCell key={`quantity-${prize?.uuid}`} className="table_item" align="left">
        {prize?.quantity}
      </TableCell>
      <TableCell key={`desc-${prize?.uuid}`} className="table_item" align="left">
        {prize?.description}
      </TableCell>
      <TableCell key={`date-${prize?.uuid}`} className="table_item" align="left">
        {prize?.created_at}
      </TableCell>
    </TableRow>
  )
};

export default PrizeList;

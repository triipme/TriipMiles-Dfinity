import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import moment from "moment";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Page from "../../components/Page";
import "./Prize.css";
import AddPrizeBtn from "./AddPrizeBtn";
import NumberFormat from 'react-number-format';

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
    <Page title="Prize | Triip Admin">
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
                  <TableCell className="table_title" align="left">
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* Table Content Item */}

              {prizeList?.map((prize, key) => (
                <RenderPrize prize={prize} key={key} />
              ))}
            </Table>
          </Grid>
        </TableContainer>
      </div>
    </Page>
  );
};

const RenderPrize = ({ prize }) => {
  return (
    <TableBody className="table_container">
      <TableRow key={prize?.uuid} style={{ verticalAlign: "center" }}>
        <TableCell key={`uuid-${prize?.uuid}`} className="table_item" align="left">
          {prize?.uuid}
        </TableCell>
        <TableCell key={`name-${prize?.uuid}`} className="table_item" align="left">
          <p className="locale_en" >
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
          <NumberFormat
            value={prize?.quantity} displayType={'text'}
            thousandSeparator={true}
          />
        </TableCell>
        <TableCell key={`desc-${prize?.uuid}`} className="table_item" align="left">
          {prize?.description}
        </TableCell>
        <TableCell key={`date-${prize?.uuid}`} className="table_item" align="left">
          {moment.unix(parseInt(prize?.created_at[0] / BigInt(1e9))).format("LL")}
        </TableCell>
        <TableCell key={`actions-${prize?.uuid}`} className="table_item" align="left">
          <Link to={`/triip-admin/dashboard/prizes/edit/${prize?.uuid}`} title="Edit Prize">
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
  )
};

export default PrizeList;

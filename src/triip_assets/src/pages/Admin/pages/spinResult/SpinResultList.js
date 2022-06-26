import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TablePagination
} from "@mui/material";
import "../prize/Prize.css";
import "./spinResult.css";
import "../prize/AddPrize.css";

export default function SpinResults() {
  const { actor } = useSelector(state => state.user);
  const [spinResultList, setSpinResultList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getSpinResults() {
    try {
      if (!!actor?.listAdminSpinResults) {
        const list = await actor.listAdminSpinResults();
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
  }, [actor]);

  return (
    <>
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
            {/* Table Content List */}
            <Table size="normal" className="prizes_table">
              <TableHead>
                <TableRow>
                  <TableCell className="table_title" align="left">
                    ID
                  </TableCell>
                  <TableCell className="table_title" align="left">
                    USER PRINCIPAL
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
                {spinResultList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((spinResult, key) => (
                  <RenderSpinResult spinResult={spinResult} key={key} />
                ))}
              </TableBody>
            </Table>
          </Grid>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={spinResultList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}

const RenderSpinResult = ({ spinResult }) => {
  return (
    <TableRow key={spinResult?.uuid} style={{ verticalAlign: "center", height: "70px" }}>
      <TableCell key={`uuid-${spinResult?.uuid}`} className="table_item" align="left">
        {spinResult?.uuid}
      </TableCell>
      <TableCell key={`username-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
          {spinResult?.username[0]}
        </p>
      </TableCell>
      <TableCell key={`prize_name-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
          {spinResult?.prize_name}
        </p>
      </TableCell>
      <TableCell key={`remark-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
          {spinResult?.state}
        </p>
      </TableCell>
      <TableCell key={`state-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
          {spinResult?.remark}
        </p>
      </TableCell>
      <TableCell key={`created_at-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
          {moment.unix(parseInt(spinResult?.created_at / BigInt(1e9))).format("lll")}
        </p>
      </TableCell>
      <TableCell key={`updated_at-${spinResult?.uuid}`} className="table_item" align="left">
        <p>
          {moment.unix(parseInt(spinResult?.updated_at[0] / BigInt(1e9))).format("lll")}
        </p>
      </TableCell>
    </TableRow>
  )
};
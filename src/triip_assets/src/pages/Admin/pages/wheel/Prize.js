import React from "react";
import { useState } from "react";

import { Icon } from "@iconify/react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import "../prize/AddPrize.css";
import "./handleLuckyWheels.css";

function Prize({ prize, remove }) {
  const [prizeData, setPrizeData] = useState(prize);

  const handleClick = evt => {
    remove(evt.target.id);
  };

  return (
    <TableRow key={`table_key-${prizeData?.prize_id}`} style={{ verticalAlign: "center"}} >
      <TableCell key={`prize_id-${prizeData?.prize_id}`} className="table_item" align="left" style={{borderBottom:"none"}}>
        {prizeData.prize_id}
      </TableCell>
      <TableCell key={`prize_name-${prizeData?.prize_id}`} className="table_item" align="left" style={{borderBottom:"none"}}>
        {prizeData.prize_name}
      </TableCell>
      <TableCell key={`percentage-${prizeData?.prize_id}`} className="table_item" align="left" style={{borderBottom:"none"}}>
        {prizeData.percentage}
      </TableCell>
      <TableCell key={`cap_per_user_per_month-${prizeData?.prize_id}`} className="table_item" align="left" style={{borderBottom:"none"}}>
        {prizeData.cap_per_user_per_month}
      </TableCell>
      <TableCell key={`cap_per_month-${prizeData?.prize_id}`} className="table_item" align="left" style={{borderBottom:"none"}}>
        {prizeData.cap_per_month}
      </TableCell>
      <TableCell key={`cap_per_day-${prizeData?.prize_id}`} className="table_item" align="left" style={{borderBottom:"none"}}>
        {prizeData.cap_per_day}
      </TableCell>
      <TableCell key={`delete_btn-${prizeData?.prize_id}`} className="table_item" align="left" style={{borderBottom:"none"}}>
        <button style={{ margin:"0", backgroundColor:"#ed2e6ed4", color:"#fff" }} className="btn" onClick={handleClick} >
          <Icon style={{ fontSize:"18px" }} icon="ep:delete" id={prizeData.prize_id}/>
        </button>
      </TableCell>
    </TableRow>
  );
}

export default Prize;

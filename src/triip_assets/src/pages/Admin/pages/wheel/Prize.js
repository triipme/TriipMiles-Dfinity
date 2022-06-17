import React from "react";
import { useState, useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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

import AddLuckyWheelBtn from "./AddLuckyWheelBtn";
import "../prize/AddPrize.css";
import "./handleLuckyWheels.css";

import Page from "../../components/Page";
import {
  ButtonPrimary,
  InputText
} from "../../../../components";
import { ERRORS } from "../../../../utils/constants";
import NewPrizeForm from "./NewPrizeForm";

function Prize({ prize, remove }) {
  const [prizeData, setPrizeData] = useState(prize);

  const handleClick = evt => {
    remove(evt.target.id);
  };

  return (
    // <TableBody className="table_container">
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
          <button style={{ margin:"0", backgroundColor:"#ed2e6ed4", color:"#fff" }} className="btn" onClick={handleClick} id={prizeData.prize_id}>
            <Icon style={{ fontSize:"18px" }} icon="ep:delete" />
          </button>
        </TableCell>
      </TableRow>
    // </TableBody>
    
  );
  //   result = (
  //     // <div className="Todo">
  //     //   <div className="btn_actions btn_custom_delete">
  //     //     <button onClick={handleClick}>
  //     //       <i id={prizeData.id} className="fas fa-trash" />
  //     //     </button>
  //     //   </div>
  //     // </div>
  //     <form className="form_add_prize_item">
  //       {/* <div className="form_add_item">
  //         {prizeData.id}
  //       </div> */}
  //       <div className="form_add_item">
  //         {prizeData.prize_name}
  //       </div>
  //       <div className="form_add_item">
  //         {prizeData.percentage}
  //       </div>
  //       <div className="form_add_item">
  //         {prizeData.cap_per_user_per_month}
  //       </div>
  //       <div className="form_add_item">
  //         {prizeData.cap_per_month}
  //       </div>
  //     </form>
      
  //   );
  // return result;
}

export default Prize;

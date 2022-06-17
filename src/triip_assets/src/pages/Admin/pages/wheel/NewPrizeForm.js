import React from "react";
import uuid from "uuid";
import ReactDOM from "react-dom";
import { useState, useEffect, useRef, useReducer} from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import AddLuckyWheelBtn from "./AddLuckyWheelBtn";
import "../prize/AddPrize.css";
import "./NewPrizeForm.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Page from "../../components/Page";
import {
  ButtonPrimary,
  InputText
} from "../../../../components";
import { ERRORS } from "../../../../utils/constants";

function NewPrizeForm({ task, createPrize }) {
  const { actor } = useSelector(state => state.user);
  const [prizeList, setPrizeList] = useState([]);

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      prize_id: "",
      prize_name:"",
      percentage: "",
      cap_per_user_per_month: "",
      cap_per_month: "",
      cap_per_day: ""
    }
  );

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

  const prizeNameList = []
  prizeList?.map((prize, _key) => (
    prizeNameList.push(prize.name)
  ));  

  const handleChange = evt => {
    const value = evt.target.value;
    setUserInput({
      ...userInput,
      [evt.target.name]: value
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const newPrize = { 
      prize_id: userInput.prize_id,
      prize_name: userInput.prize_name,
      percentage: parseFloat(userInput.percentage),
      cap_per_user_per_month: parseInt(userInput.cap_per_user_per_month),
      cap_per_month: parseInt(userInput.cap_per_month),
      cap_per_day: parseInt(userInput.cap_per_day)
    };
    createPrize(newPrize);
    setUserInput({ 
      prize_id: "",
      prize_name: "",
      percentage: "",
      cap_per_user_per_month: "",
      cap_per_month: "", 
      cap_per_day: ""
    });
  };

  return (
    <>
        <form className="form_add_prize" onSubmit={handleSubmit}>
          <div className="input_wrapper">
            <label className="input_label" htmlFor="prize_id">PRIZE ID</label>
            <input className="prize_form_input"
                value={userInput.prize_id}
                onChange={handleChange}
                id="prize_id"
                name="prize_id"
                required
              />
          </div>

        <div className="input_wrapper">
        <label className="input_label" htmlFor="prize_id">PRIZE NAME</label>
          {/* <input className="prize_form_input"
            // value={userInput.prize_name}
            // onChange={handleChange}
            // id="prize_name"
            // name="prize_name"
            // required
          /> */}
            
          <select id="prize_name" name="prize_name" onChange={handleChange} className="prize_form_input">
            {prizeNameList.map((prizeName, index) => (
              <option 
                value={() => {userInput.prizeName = prizeName}}
                key={index}
              >
                {prizeName}
              </option>
            ))}
          </select>
        </div>

        <div className="input_wrapper">
          <label className="input_label" htmlFor="prize_id">PERCENTAGE</label>
          <input className="prize_form_input"
            value={userInput.percentage}
            onChange={handleChange}
            id="percentage"
            name="percentage"
            required
          />
        </div>

        <div className="input_wrapper">
          <label className="input_label" htmlFor="prize_id">CAP PER USER PER MONTH</label>
          <input className="prize_form_input"
            value={userInput.cap_per_user_per_month}
            onChange={handleChange}
            id="cap_per_user_per_month"
            name="cap_per_user_per_month"
            required
          />
        </div>

        <div className="input_wrapper">
          <label className="input_label" htmlFor="prize_id">CAP PER MONTH</label>
          <input className="prize_form_input"
            value={userInput.cap_per_month}
            onChange={handleChange}
            id="cap_per_month"
            name="cap_per_month"
            required
          />
        </div>

        <div className="input_wrapper">
          <label className="input_label" htmlFor="prize_id">CAP PER DAY</label>
          <input className="prize_form_input"
            value={userInput.cap_per_day}
            onChange={handleChange}
            id="cap_per_day"
            name="cap_per_day"
            required
          />
        </div>
        <div className="input_wrapper">
          <button className="add_prize_btn" >Add Prize</button>
        </div>
        </form>
    </>
    // <form className="form_add_prize_item" onSubmit={handleSubmit}>
    //   <div className="form_add_item">
    //     <input
    //       value={userInput.prize_name}
    //       onChange={handleChange}
    //       id="prize_name"
    //       type="text"
    //       name="prize_name"
    //       placeholder="PRIZE NAME"
    //       required
    //     />
    //   </div>

    //   <div className="form_add_item">
    //     <input
    //       value={userInput.percentage}
    //       onChange={handleChange}
    //       id="percentage"
    //       
    //       name="percentage"
    //       placeholder="PERCENTAGE"
    //       required
    //     />
    //   </div>

    //   <div className="form_add_item">
    //     <input
    //       value={userInput.cap_per_user_per_month}
    //       onChange={handleChange}
    //       id="cap_per_user_per_month"
    //       type="number"
    //       name="cap_per_user_per_month"
    //       placeholder="CAP PER USER PER MONTH"
    //       required
    //     />
    //   </div>

    //   <div className="form_add_item">
    //     <input
    //       value={userInput.cap_per_month}
    //       onChange={handleChange}
    //       id="cap_per_month"
    //       type="number"
    //       name="cap_per_month"
    //       placeholder="CAP PER MONTH"
    //       required
    //     />
    //   </div>

    //   <button className="btn btn_submit">Add Prize</button>
    // </form>
    
  );
}

export default NewPrizeForm;

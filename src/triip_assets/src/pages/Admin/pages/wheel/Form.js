import React from "react";
import { useState, useEffect, useRef} from "react";
import uuid from "uuid";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import AddLuckyWheelBtn from "./AddLuckyWheelBtn";
import "../prize/AddPrize.css";
import "./handleLuckyWheels.css";

import Page from "../../components/Page";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import {
  ButtonPrimary,
  InputText
} from "../../../../components";
import { ERRORS } from "../../../../utils/constants";
import NewPrizeForm from "./NewPrizeForm";
import Prize from "./Prize";

function Form() {
  const { actor } = useSelector(state => state.user);
  const [prizes, setPrizes] = useState([{ 
    prize_id: "",
    prize_name: "",
    percentage: "",
    cap_per_user_per_month: "",
    cap_per_month: "",
    cap_per_day: ""
    },
  ]);

  const create = newPrize => {
    console.log(newPrize);
    setPrizes([...prizes, newPrize]);
  };

  const remove = id => {
    setPrizes(prizes.filter(prize => prize.prize_id !== id));
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      max_spin_times: "",
      max_buy_spin_times: "",
      price_of_spin: "",
      wheel_prizes: []
    }});
  const [, ...prizeDataList] = prizes;
  console.log(prizeDataList);

  const prizeList = prizeDataList.map(prize => (
    <Prize
      key={prize.prize_id}
      prize={prize}
      remove={remove}
    />
  ));

  const wheelData = () => {
    const {
      name,
      max_spin_times,
      max_buy_spin_times,
      price_of_spin,
      wheel_prizes
    } = getValues();
    return {
      name: name,
      max_spin_times: parseInt(max_spin_times),
      max_buy_spin_times: parseInt(max_buy_spin_times),
      price_of_spin: parseFloat(price_of_spin),
      wheel_prizes: prizeDataList,                             
    };
  };     
  const onSubmit = async () => {
    if (!!actor?.createWheel) {
      try {
        const result = await actor?.createWheel(wheelData());
        if ("ok" in result) {
          toast.success("Success !.");
        } else {
          console.log(result);
          throw result?.err;
        }
      } catch (error) {
        toast.error(
          {
            "NotAuthorized": "Please sign in!.",
            "AdminRoleRequired": "Required admin role.",
            "AlreadyExisting": "UUID is existed."
          }[Object.keys(error)[0]],
          { duration: 5000 }
        );
        console.log(error);
      }
    } else {
      toast.error("Please sign in!.");
    }
  };
  return (
    <>
      <div className="add_lkw_content">
        <div className="form_group">
          <div style={{width: "70%",marginRight: "15px"}}>
            <InputText
              control={control}
              placeHolder="NAME"
              label="NAME"
              name="name"
              helperTextError={ERRORS}
            />
          </div>
          <div style={{width: "50%",marginRight: "15px"}}>
            <InputText
              control={control}
              placeHolder="MAX SPIN TIMES"
              label="MAX SPIN TIMES"
              name="max_spin_times"
              helperTextError={ERRORS}
            />
          </div>
          <div style={{width: "50%",marginRight: "15px"}}>
            <InputText
              control={control}
              placeHolder="MAX BUY SPIN TIMES"
              label="MAX BUY SPIN TIMES"
              name="max_buy_spin_times"
              helperTextError={ERRORS}
            />
          </div>
          <div style={{width: "50%"}}>
            <InputText
              control={control}
              placeHolder="PRICE OF SPIN"
              label="PRICE OF SPIN"
              name="price_of_spin"
              helperTextError={ERRORS}
            />
          </div>
        </div>
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
                  <TableCell className="prize_table_title" align="left">
                    PRIZE ID
                  </TableCell>
                  <TableCell className="prize_table_title" align="left">
                    PRIZE NAME
                  </TableCell>
                  <TableCell className="prize_table_title" align="left">
                    PERCENTAGE
                  </TableCell>
                  <TableCell className="prize_table_title" align="left">
                    CAP PER USER PER MONTH
                  </TableCell>
                  <TableCell className="prize_table_title" align="left">
                    CAP PER MONTH
                  </TableCell>
                  <TableCell className="prize_table_title" align="left">
                    CAP PER DAY
                  </TableCell>
                  <TableCell className="prize_table_title" align="left">
                  </TableCell>
                </TableRow>
              </TableHead>
              {prizeList}
            </Table>
          </Grid>
        </TableContainer>

        {/* <div style={{ display: "flex" }}>
          <input type="number" name="" id="" />
          <input type="number" name="" id="" />
          <input type="number" name="" id="" />
          <input type="number" name="" id="" />
          <input type="number" name="" id="" />
          <input type="number" name="" id="" />
        </div> */}


        <div style={{marginTop:"2%"}}>
          <NewPrizeForm createPrize={create} />
        </div>
        <div className="form_button">
          <div>
            <ButtonPrimary
              loading={isSubmitting}
              sx={{ mt: 2 }}
              title="Submit"
              onClick={handleSubmit(onSubmit)}
            />
          </div>      
         
        </div>
      </div>
    </>
    
  );
}

export default Form;

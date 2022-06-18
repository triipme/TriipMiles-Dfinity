import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import "../prize/AddPrize.css";
import "./handleLuckyWheels.css";

import Table from "@mui/material/Table";
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

function EditWheel() {
  const { actor } = useSelector(state => state.user);
  const [wheel, setWheel] = useState([]);
  async function getWheel() {
    try {
      if (!!actor?.readWheel) {
        const result = await actor.readWheel(params.wheel_id);
        if ("ok" in result) {
          setWheel(result.ok);
        } else {
          throw result.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getWheel();
  }, []);
  const params = useParams();
  console.log(params.wheel_id)
  console.log(wheel.wheel_prizes)

  const [prizes, setPrizes] = useState([{ 
    prize_id: "",
    prize_name: "",
    percentage: "",
    cap_per_user_per_month: "",
    cap_per_month: "",
    cap_per_day: ""
    },
  ]);
  console.log(prizes)
  const create = newPrize => {
    console.log(newPrize);
    setPrizes([...prizes, newPrize]);
  };

  const remove = id => {
    setPrizes(prizes.filter(prize => prize.prize_id != id));
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
    if (!!actor?.updateWheel) {
      try {
        const result = await actor?.updateWheel(params.wheel_id, wheelData());
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

export default EditWheel;

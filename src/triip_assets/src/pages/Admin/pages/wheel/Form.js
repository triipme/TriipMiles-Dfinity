import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import _ from "lodash";
import "../prize/AddPrize.css";
import "./handleLuckyWheels.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  Grid,
  Stack
} from "@mui/material";
import {
  ButtonPrimary,
  InputText
} from "../../../../components";
import { ERRORS } from "../../../../utils/constants";
import { Icon } from "@iconify/react";
import Page from "../../components/Page";

function Form() {
  const { actor } = useSelector(state => state.user);
  const [prizes, setPrizes] = useState([{
    prize_id: {},
    percentage: null,
    cap_per_user_per_month: null,
    cap_per_month: null,
    cap_per_day: null,
    deleted: false
  }]);
  const [prizeList, setPrizeList] = useState([]);

  const addPrize = () => {
    const newPrize = {
      prize_id: {},
      percentage: null,
      cap_per_user_per_month: null,
      cap_per_month: null,
      cap_per_day: null,
      deleted: false
    }
    setPrizes([...prizes, newPrize]);
  };

  const removePrize = index => {
    const list = _.map(prizes, (item, i) => {
      if (i == index) {
        return _.merge(item, {deleted: true});
      } else {
        return item;
      }
    });
    setPrizes(list);
  };

  useEffect(() => {
    const loadPrizeList = async () => {
      const result = await actor.listPrizes();
      if ('ok' in result) {
        setPrizeList(_.map(result.ok, item => { return {label: item.name, id: item.uuid[0]} }));
      }
    }
    loadPrizeList();
  }, [actor]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = useForm({
    defaultValues: {
      name: null,
      max_spin_times: null,
      max_buy_spin_times: null,
      price_of_spin: null,
      wheel_prizes: [prizes]
    }
  });

  const wheelData = () => {
    const {
      name,
      max_spin_times,
      max_buy_spin_times,
      price_of_spin,
      wheel_prizes,
    } = getValues();

    return {
      name: name,
      max_spin_times: parseInt(max_spin_times),
      max_buy_spin_times: parseInt(max_buy_spin_times),
      price_of_spin: parseFloat(price_of_spin),
      wheel_prizes: _.filter(wheel_prizes, (_prize, index) => !prizes[index].deleted).map(item => {
        return {
          prize_id: item.prize_id.id,
          percentage: parseFloat(item.percentage) / 100,
          cap_per_user_per_month: parseInt(item.cap_per_user_per_month),
          cap_per_month: parseInt(item.cap_per_month),
          cap_per_day: parseInt(item.cap_per_day)
        }
      }),
    };
  };

  const onSubmit = async () => {
    if (!!actor?.createWheel) {
      try {
        const result = await actor?.createWheel(wheelData());
        if ("ok" in result) {
          toast.success("Success !.");
        } else {
          throw result?.err;
        }
      } catch (error) {
        toast.error(
          {
            "NotAuthorized": "Please sign in!.",
            "AdminRoleRequired": "Required admin role.",
            "AlreadyExisting": "UUID is existed.",
            "Failed": "Total percentage is not equal 100%."
          }[Object.keys(error)[0]],
          { duration: 5000 }
        );
      }
    } else {
      toast.error("Please sign in!.");
    }
  };

  return (
    <Page title="New Lucky Wheel | Triip Admin">
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
                    PRIZE
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
              {prizes.map((prize, index) => {
                if (prize.deleted) {
                  return;
                }
                return (<TableBody className="table_container" key={`table_key-${index}`}>
                  <TableRow style={{ verticalAlign: "center"}} >
                    <TableCell key={`prize_name-${index}`} className="table_item" align="left" style={{borderBottom:"none",width:"20%"}}>
                      <InputText
                        control={control}
                        placeHolder="Prize"
                        label="Prize"
                        name={`wheel_prizes[${index}][prize_id]`}
                        autocompleteOptions={prizeList}
                        helperTextError={ERRORS}
                      />
                    </TableCell>
                    <TableCell key={`percentage-${index}`} className="table_item" align="left" style={{borderBottom:"none"}}>
                      <InputText
                        control={control}
                        placeHolder="Percentage"
                        label="Percentage"
                        name={`wheel_prizes[${index}][percentage]`}
                        helperTextError={ERRORS}
                      />
                    </TableCell>
                    <TableCell key={`cap_per_user_per_month-${index}`} className="table_item" align="left" style={{borderBottom:"none"}}>
                      <InputText
                        control={control}
                        placeHolder="Cap per user per month"
                        label="Cap per user per month"
                        name={`wheel_prizes[${index}][cap_per_user_per_month]`}
                        helperTextError={ERRORS}
                      />
                    </TableCell>
                    <TableCell key={`cap_per_month-${index}`} className="table_item" align="left" style={{borderBottom:"none"}}>
                      <InputText
                        control={control}
                        placeHolder="Cap per month"
                        label="Cap per month"
                        name={`wheel_prizes[${index}][cap_per_month]`}
                        helperTextError={ERRORS}
                      />
                    </TableCell>
                    <TableCell key={`cap_per_day-${index}`} className="table_item" align="left" style={{borderBottom:"none"}}>
                      <InputText
                        control={control}
                        placeHolder="Cap per day"
                        label="Cap per day"
                        name={`wheel_prizes[${index}][cap_per_day]`}
                        helperTextError={ERRORS}
                      />
                    </TableCell>
                    <TableCell key={`delete_btn-${index}`} className="table_item" align="left" style={{borderBottom:"none"}}>
                      <button style={{ margin:"0", backgroundColor:"#ed2e6ed4", color:"#fff" }} className="btn" onClick={() => removePrize(index)} >
                        <Icon style={{ fontSize:"18px" }} icon="ep:delete" />
                      </button>
                    </TableCell>
                  </TableRow>
                </TableBody>)
              })}
              <TableFooter>
                <TableRow>
                  <TableCell>
                    <Button variant="contained" onClick={addPrize}>Add Prize</Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Grid>
        </TableContainer>
        <div className="form_button">
          <Stack direction="row" spacing={2}>
            <Button variant="contained" href="/triip-admin/dashboard/wheels" color="inherit">Cancel</Button>
            <ButtonPrimary
              loading={isSubmitting}
              sx={{ mt: 2 }}
              title="Submit"
              onClick={handleSubmit(onSubmit)}
            />
          </Stack>
        </div>
      </div>
    </Page>
  );
}

export default Form;

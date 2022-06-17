import React from "react";
import { useState, useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import AddLuckyWheelBtn from "./AddLuckyWheelBtn";
import "../prize/AddPrize.css";
import "./handleLuckyWheels.css";

import Page from "../../components/Page";
import {
  ButtonPrimary,
  InputText
} from "../../../../components";
import { ERRORS } from "../../../../utils/constants";

const LuckyWheelForm = ({ index, handleRemove, getData }) => {
  const { actor } = useSelector(state => state.user);
  const [prizeList, setPrizeList] = useState([]);
  const [state, setState] = useState({
    prizeName: "",
    percentage: "",
    cap_per_user_per_month: "",
    cap_per_month: ""
  })
 
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

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
  useEffect(() => {
    getData(state);
  }, [state]);

  const prizeNameList = []
  prizeList?.map((prize, _key) => (
    prizeNameList.push(prize.name)
  ))  

  return (
    <>
      <div className="form_add_item">
        <label htmlFor="">Prize ID</label>
      </div>
      <div className="form_add_item">
        <label htmlFor="">
          <abbr title="required">*</abbr> PRIZE NAME
        </label>
        <input type="text" name="prizeName" id="" onChange={handleChange} value={state.prizeName}/>
      </div>

      <div className="form_add_item">
        <label htmlFor="">
          <abbr title="required">*</abbr> PERCENTAGE
        </label>
        <input type="number" name="percentage" id="" onChange={handleChange} value={state.percentage}/>
      </div>
      <div className="form_add_item">
        <label htmlFor="">
          <abbr title="required">*</abbr> CAP PER USER PER MONTH
        </label>
        <input type="number" name="cap_per_user_per_month" id="" onChange={handleChange} value={state.cap_per_user_per_month}/>
      </div>
      <div className="form_add_item">
        <label htmlFor="">
          <abbr title="required">*</abbr> CAP PER MONTH
        </label>
        <input type="number" name="cap_per_month" id="" onChange={handleChange} value={state.cap_per_month}/>
      </div>
    
      <div style={{marginRight: "15px"}}>
        <button
          className="btn_actions btn_custom_delete"
          onClick={() => handleRemove(index)}
        >
          <Icon icon="ep:delete" />
        </button>
      </div>
    </>
  );
};

function AddLuckyWheelsItem() {
  const { actor } = useSelector(state => state.user);
  const [addLuckyWheel, setAddLuckyWheel] = useState([]);
  const [prizeData, setPrizeData] = useState({
    prizeName: "",
    percentage: "",
    cap_per_user_per_month: "",
    cap_per_month: ""
  });
  const [prizeDataList, setPrizeDataList] = useState([]);
  const handleAddLuckyWheel = () => {
    const newLuckyWheel = [...addLuckyWheel, <LuckyWheelForm />];
    setAddLuckyWheel(newLuckyWheel);
    console.log("add prize");
  };
  const handleRemove = (index) => {
    const newLocaleRemove = [...addLuckyWheel];
    newLocaleRemove.splice(index, 1);
    setAddLuckyWheel(newLocaleRemove);
    console.log("remove prize");
    console.log(index);
  };

  const handleGetData = (data) => {

    setPrizeData({
      prizeName: data.prizeName,
      percentage: data.percentage,
      cap_per_user_per_month: data.cap_per_user_per_month,
      cap_per_month: data.cap_per_month
    });
  };
  useEffect(() => {
    setPrizeDataList([...prizeDataList, prizeData]);
  }, [prizeData]);

  console.log(prizeDataList);

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
      wheel_prizes: wheel_prizes,                             
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
    <Page title="New Wheel | Triip Admin">
      <div className="wrapper_handle_add">
        <AddLuckyWheelBtn />
        <div className="add_lkw_content">
          <div className="form_container">
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
              <div style={{width: "50%",marginRight: "15px"}}>
                <InputText
                  control={control}
                  placeHolder="PRICE OF SPIN"
                  label="PRICE OF SPIN"
                  name="price_of_spin"
                  helperTextError={ERRORS}
                />
              </div>
            </div>
            {/* Form add LuckyWheel */}
            <div className="form_add">
              <p className="form_add_header">PRIZES (WINNING PERCENTAGE: 0%)</p>
              {addLuckyWheel.map((luckywheel, index) => (
                <div className="form_add_prize_item" key={index}>
                  <LuckyWheelForm getData={handleGetData} index={index} handleRemove={handleRemove}/>
                </div>
              ))}
              <div className="form_add_prizes_button">
                <button
                  className="btn btn_submit"
                  onClick={handleAddLuckyWheel}
                >
                  Add Prize
                </button>
              </div>
            </div>
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
            <div>
              <Link to="/triip-admin/dashboard/admin_luckywheel">
                <button className="btn btn_cancel">Cancel</button>
              </Link>
            </div>  
          </div>
        </div>
      </div>
    </Page>
  );
}
export default AddLuckyWheelsItem;
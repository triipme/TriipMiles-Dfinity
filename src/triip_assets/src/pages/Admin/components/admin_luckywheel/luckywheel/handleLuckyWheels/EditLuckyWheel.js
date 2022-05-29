import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import AddLuckyWheelButton from "./AddLuckyWheelsButton";
import "./handleLuckyWheels.css";

const LuckyWheelForm = ({ index, handleRemove }) => {
  return (
    <>
      <div className="form_add_item">
        <label htmlFor="">Prize ID</label>
      </div>
      <div className="form_add_item">
        <label htmlFor="">Prize NAME</label>
        <select name="" id="">
          <option value="+1 TIIM">+1 TIIM </option>
          <option value="+10 TIIM">+10 TIIM </option>
          <option value="+100 TIIM">+100 TIIM </option>
          <option value="+1000 TIIM">+1000 TIIM </option>
          <option value="+123 TIIM">+123 TIIM </option>
          <option value="+999 TIIM">+999 TIIM </option>
          <option value="Sorry you didn't win ">Sorry you didn't win </option>
          <option value="+1 Spin">+1 Spin </option>
        </select>
      </div>
      <div className="form_add_item">
        <label htmlFor="">
          <abbr title="required">*</abbr> PERCENTAGE
        </label>
        <input type="number" name="" id="" />
      </div>
      <div className="form_add_item">
        <label htmlFor="">CAP PER USER PER MONTH</label>
        <input type="number" name="" id="" />
      </div>
      <div className="form_add_item">
        <label htmlFor="">CAP PER MONTH</label>
        <input type="number" name="" id="" />
      </div>
      <div className="form_add_item">
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
function EditLuckyWheel() {
  const [addLuckyWheel, setAddLuckyWheel] = useState([]);
  const handleAddLuckyWheel = () => {
    const newLuckyWheel = [...addLuckyWheel, <LuckyWheelForm />];
    setAddLuckyWheel(newLuckyWheel);
  };
  const handleRemove = (index) => {
    const newLocaleRemove = [...addLuckyWheel];
    newLocaleRemove.splice(index, 1);
    setAddLuckyWheel(newLocaleRemove);
    console.log(index);
  };
  return (
    <>
      <div className="wrapper_handle_add">
        <AddLuckyWheelButton />
        <div className="add_lkw_content">
          <div className="form_container">
            <div className="form_group">
              <div className="form_group_item">
                <label htmlFor="">NAME</label>
                <input type="text" value="No Active Wheel" />
              </div>
              <div className="form_group_item">
                <label htmlFor="">MAX SPIN TIMES</label>
                <input type="number" value="2" />
              </div>
              <div className="form_group_item">
                <label htmlFor="">MAX SPIN BUY TIMES</label>
                <input type="number" value="0" />
              </div>
              <div className="form_group_item">
                <label htmlFor="">PRICE OF SPIN</label>
                <input type="number" value="0" />
              </div>
            </div>
            {/* Form add LuckyWheel */}
            <div className="form_add">
              <div class="form_add_prize_item">
                <div class="form_add_item">
                  <label for="">Prize ID</label>
                  <span>37</span>
                </div>
                <div class="form_add_item">
                  <label for="">Prize NAME</label>
                  <select name="" id="">
                    <option value="+1 TIIM">+1 TIIM </option>
                    <option value="+10 TIIM">+10 TIIM </option>
                    <option value="+100 TIIM">+100 TIIM </option>
                    <option value="+1000 TIIM">+1000 TIIM </option>
                    <option value="+123 TIIM">+123 TIIM </option>
                    <option value="+999 TIIM">+999 TIIM </option>
                    <option value="Sorry you didn't win ">
                      Sorry you didn't win{" "}
                    </option>
                    <option value="+1 Spin">+1 Spin </option>
                  </select>
                </div>
                <div class="form_add_item">
                  <label for="">
                    <abbr title="required">*</abbr> PERCENTAGE
                  </label>
                  <input type="number" name="" id="" value="100" />
                </div>
                <div class="form_add_item">
                  <label for="">CAP PER USER PER MONTH</label>
                  <input type="number" name="" id="" value="0" />
                </div>
                <div class="form_add_item">
                  <label for="">CAP PER MONTH</label>
                  <input type="number" name="" id="" value="0" />
                </div>
                <div class="form_add_item">
                  <button class="btn_actions btn_custom_delete">
                    <Icon icon="ep:delete" />
                  </button>
                </div>
              </div>
              {addLuckyWheel.map((luckywheel, index) => (
                <div className="form_add_prize_item" key={index}>
                  <LuckyWheelForm index={index} handleRemove={handleRemove} />
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
              <button className="btn btn_submit">Submit</button>
              <Link to="/triip-admin/dashboard/admin_luckywheel">
                <button className="btn btn_cancel">Cancel</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditLuckyWheel;

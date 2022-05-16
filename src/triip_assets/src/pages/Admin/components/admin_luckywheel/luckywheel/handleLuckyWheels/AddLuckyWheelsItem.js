import React from "react";
import AddLuckyWheelButton from "./AddLuckyWheelsButton";

function AddLuckyWheelsItem() {
  return (
    <>
      <div className="wrapper_handle_add">
        <AddLuckyWheelButton />
        <div className="add_lkw_content">
          <form action="" className="form_container">
            <div className="form_group">
              <div className="form_group_item">
                <label htmlFor="">NAME</label>
                <input type="text" />
              </div>
              <div className="form_group_item">
                <label htmlFor="">MAX SPIN TIMES</label>
                <input type="number" />
              </div>
              <div className="form_group_item">
                <label htmlFor="">MAX SPIN BUY TIMES</label>
                <input type="number" />
              </div>
              <div className="form_group_item">
                <label htmlFor="">PRICE OF SPIN</label>
                <input type="number" />
              </div>
            </div>
            <div className="form_add">
              <p>PRIZES (WINNING PERCENTAGE: 0%)</p>
              <div className="form_add_prize_item">
                  
              </div>
            </div>
            <div className="form_button"></div>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddLuckyWheelsItem;

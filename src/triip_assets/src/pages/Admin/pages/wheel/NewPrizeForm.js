import React from "react";
import { useState, useEffect, useReducer} from "react";
import { useSelector } from "react-redux";
import "../prize/AddPrize.css";
import "./NewPrizeForm.css";

function NewPrizeForm({ createPrize }) {
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
          <select id="prize_name" name="prize_name" onChange={handleChange}  className="prize_form_input">
            <option value="" selected disabled hidden>Choose here</option>
            {prizeNameList.map((prizeName, index) => (
              <option 
                value={prizeName}
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
  );
}

export default NewPrizeForm;

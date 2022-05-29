import React from "react";
import { useState } from "react";
import AddPrizesButton from "./AddPrizesButton";
import "./AddPrizes.css";

const LocaleForm = ({ index, handleRemove }) => {
  return (
    <>
      <div className="form_add-locale">
        <div className="form_locale">
          <label htmlFor="">LOCALE</label>
          <select className="form-control select required" id="prize_add_locale">
            <option value=""></option>
            <option value="en">en</option>
            <option value="vi">vi</option>
          </select>
        </div>
        <div className="form_locale">
          <label htmlFor="">TITLE</label>
          <input type="text" />
        </div>
        <div className="form_locale">
          <label htmlFor="">DESCRIPTION</label>
          <input type="text" className="form_locale-decs" />
        </div>
        <div className="align_center">
          <button className="btn btn_remove" onClick={() => handleRemove(index)}>
            Remove
          </button>
        </div>
      </div>
    </>
  );
};
function LayoutAddPrize() {
  const [addLocale, setAddLocale] = useState([]);
  const handleAddLocale = () => {
    setAddLocale([...addLocale, <LocaleForm />]);
  };
  const handleRemove = index => {
    const newLocale = [...addLocale];
    newLocale.splice(index, 1);
    setAddLocale(newLocale);
  };
  return (
    <>
      <div className="wrapper">
        <AddPrizesButton />
        <div className="content">
          <div className="form_group">
            <label htmlFor="">
              <abbr title="required">*</abbr> CLASS NAME
            </label>
            <select
              className="form-control select required"
              name="prize[class_name]"
              id="prize_class_name">
              <option value=""></option>
              <option value="PrizeService::Wasted">PrizeService::Wasted</option>
              <option value="PrizeService::ExtraSpin">PrizeService::ExtraSpin</option>
              <option value="PrizeService::TriipCredit">PrizeService::TriipCredit</option>
              <option value="PrizeService::DiscountVoucherPercentage">
                PrizeService::DiscountVoucherPercentage
              </option>
              <option value="PrizeService::FreeStaycation">PrizeService::FreeStaycation</option>
              <option value="PrizeService::SaveYourOcean">PrizeService::SaveYourOcean</option>
            </select>
          </div>
          <div className="form_group">
            <label class="control-label integer optional" htmlFor="prize_quantity">
              QUANTITY
            </label>
            <input
              className="form-control numeric integer optional"
              type="number"
              step="1"
              name="prize[quantity]"
              id="prize_quantity"
            />
          </div>
          <div className="form_group">
            <label>Prize Icon</label>
          </div>
          <div className="form_group">
            <input className="photo_upload" type="file" name="prize[icon]" id="prize_icon" />
          </div>
          {addLocale.map((locale, item, index) => (
            <div className="form_add-locale-content" key={item}>
              <LocaleForm index={index} handleRemove={handleRemove} />
            </div>
          ))}
          <div className="footer_form">
            <div>
              <button className="btn btn_add-locale" onClick={handleAddLocale}>
                Add Locale
              </button>
            </div>
            <div>
              <button className="btn btn_submit">Submit</button>
              <button className="btn btn_cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LayoutAddPrize;

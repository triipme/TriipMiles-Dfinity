import React from "react";
import { useState } from "react";
import AddPrizesButton from "./AddPrizesButton";
import "./AddPrizes.css";
function EditPrizes() {
  const LocaleForm = (index) => {
    return (
      <>
        <div className="form_add-locale">
          <div className="form_locale">
            <label htmlFor="">LOCALE</label>
            <select
              className="form-control select required"
              id="prize_add_locale"
            >
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
            <button
              className="btn btn_remove"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
        </div>
      </>
    );
  };
  const [addLocale, setAddLocale] = useState([]);
  const handleAddLocale = () => {
    setAddLocale([...addLocale, <LocaleForm />]);
  };
  const handleRemove = (e) => {
    const newLocale = [...addLocale];
    newLocale.splice(e, 1);
    setAddLocale(newLocale);
    console.log(e);
  };
  //   Remove element
  const handleRemoveChild = () => {
    const alreadyLocale = document.querySelector("#index1");
    alreadyLocale.remove();
  };
  const handleRemoveChild1 = () => {
    const alreadyLocale = document.querySelector("#index2");
    alreadyLocale.remove();
  };
  return (
    <>
      <div className="wrapper">
        <AddPrizesButton />

        <div className="content">
          <div className="content_edit_prize">
            <div className="edit_prize_form">
              <div className="form_group">
                <label htmlFor="">
                  <abbr title="required">*</abbr> CLASS NAME
                </label>
                <select
                  className="form-control select required"
                  name="prize[class_name]"
                  id="prize_class_name"
                  value="PrizeService::SaveYourOcean"
                >
                  <option value=""></option>
                  <option value="PrizeService::Wasted">
                    PrizeService::Wasted
                  </option>
                  <option value="PrizeService::ExtraSpin">
                    PrizeService::ExtraSpin
                  </option>
                  <option value="PrizeService::TriipCredit">
                    PrizeService::TriipCredit
                  </option>
                  <option value="PrizeService::DiscountVoucherPercentage">
                    PrizeService::DiscountVoucherPercentage
                  </option>
                  <option value="PrizeService::FreeStaycation">
                    PrizeService::FreeStaycation
                  </option>
                  <option value="PrizeService::SaveYourOcean">
                    PrizeService::SaveYourOcean
                  </option>
                </select>
              </div>
              <div className="form_group">
                <label
                  class="control-label integer optional"
                  htmlFor="prize_quantity"
                >
                  QUANTITY
                </label>
                <input
                  className="form-control numeric integer optional"
                  type="number"
                  step="1"
                  name="prize[quantity]"
                  id="prize_quantity"
                  value="1"
                />
              </div>
              <div className="form_group">
                <label>Prize Icon</label>
              </div>
              <div className="form_group">
                <input
                  className="photo_upload"
                  type="file"
                  name="prize[icon]"
                  id="prize_icon"
                />
              </div>
            </div>
            <div className="edit_prize_img">
              <img
                className="prize_edit-img"
                src="https://triip-staging.imgix.net/triipme/staging/prize/icon/38/Asset_1.png"
                alt="T-Shirt"
              />
            </div>
          </div>
          <div className="form_add-locale" id="index1">
            <div className="form_locale">
              <label htmlFor="">LOCALE</label>
              <select
                className="form-control select required"
                id="prize_add_locale"
                value="en"
              >
                <option value=""></option>
                <option value="en">en</option>
                <option value="vi">vi</option>
              </select>
            </div>
            <div className="form_locale">
              <label htmlFor="">TITLE</label>
              <input type="text" value="Triip T-Shirt" />
            </div>
            <div className="form_locale">
              <label htmlFor="">DESCRIPTION</label>
              <input
                type="text"
                className="form_locale-decs"
                value="You got a Triip T-Shirt"
              />
            </div>
            <div className="align_center">
              <button
                className="btn btn_remove"
                onClick={() => handleRemoveChild()}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="form_add-locale" id="index2">
            <div className="form_locale">
              <label htmlFor="">LOCALE</label>
              <select
                className="form-control select required"
                id="prize_add_locale"
                value="vi"
              >
                <option value=""></option>
                <option value="en">en</option>
                <option value="vi">vi</option>
              </select>
            </div>
            <div className="form_locale">
              <label htmlFor="">TITLE</label>
              <input type="text" value="Triip T-Shirt" />
            </div>
            <div className="form_locale">
              <label htmlFor="">DESCRIPTION</label>
              <input
                type="text"
                className="form_locale-decs"
                value="You got a Triip T-Shirt"
              />
            </div>
            <div className="align_center">
              <button
                className="btn btn_remove"
                onClick={() => handleRemoveChild1()}
              >
                Remove
              </button>
            </div>
          </div>
          {addLocale.map((locale, index) => (
            <div className="form_add-locale-content" key={index}>
              {locale}
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
export default EditPrizes;

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  ButtonPrimary,
  InputText
} from "../../../../components";

import { ERRORS } from "../../../../utils/constants";

import AddPrizeBtn from "./AddPrizeBtn";
import "./AddPrize.css";
function EditPrize() {
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

  const prizeTypes = ["Wasted", "ExtraSpin", "TriipCredit"];
  const params = useParams();
  console.log(params.prize_id);

  const [prize, setPrize] = useState([]);
  const { actor } = useSelector(state => state.user);
  async function getPrize() {
    try {
      if (!!actor?.readPrize) {
        const result = await actor.readPrize(params.prize_id);
        if ("ok" in result) {
          setPrize(result.ok);
        } else {
          throw result.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPrize();
  }, []);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      prize_type: "",
      name: "",
      quantity: "",
      icon: "",
      description: ""
    }
  });

  const prizeData = () => {
    const {
      prize_type,
      name,
      quantity,
      icon,
      description
    } = getValues();
    return {
      uuid: [params.prize_id],
      prize_type: prize_type,
      name: name,
      quantity: parseFloat(quantity),
      icon: icon,
      description: description,
      created_at: [0]
    };
  };

  const onSubmit = async () => {
    if (!!actor?.updatePrize) {
      try {
        const result = await actor?.updatePrize(params.prize_id, prizeData());
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

  return (
    <>
      <div className="wrapper">
        <AddPrizeBtn />
        <div className="content">
          <div className="content_edit_prize">
            <div className="edit_prize_form" style={{width: "30%"}}>
              <InputText
                control={control}
                placeHolder="CLASS NAME"
                label="CLASS NAME"
                name="prize_type"
                helperTextError={ERRORS}
                autocompleteOptions={prizeTypes}
              />
              <InputText
                control={control}
                placeHolder="QUANTITY"
                label="QUANTITY"
                name="quantity"
                helperTextError={ERRORS}
              />
              <InputText
                control={control}
                placeHolder="Icon"
                label="Prize Icon"
                name="icon"
                helperTextError={ERRORS}
              />
            </div>
            <div className="edit_prize_img">
              <img
                className="prize_edit-img"
                src={prize.icon}
                // "https://triip-staging.imgix.net/triipme/staging/prize/icon/38/Asset_1.png"
                alt={prize.name}
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
            <div style={{width: "100%", marginRight: "15px"}}>
              <InputText
                control={control}
                placeHolder="TITLE"
                label="TITLE"
                name="name"
                helperTextError={ERRORS}
              />
            </div>
            <div style={{width: "100%", marginRight: "15px"}}>
              <InputText
                control={control}
                placeHolder="DESCRIPTION"
                label="DESCRIPTION"
                name="description"
                helperTextError={ERRORS}
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
        </div>
      </div>
    </>
  );
}
export default EditPrize;
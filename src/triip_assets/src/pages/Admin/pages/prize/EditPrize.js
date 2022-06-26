import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loading } from "../../../../components";
import Page from "../../components/Page";
import {
  ButtonPrimary,
  InputText
} from "../../../../components";
import { ERRORS } from "../../../../utils/constants";
import AddPrizeBtn from "./AddPrizeBtn";
import "./AddPrize.css";

function EditPrize() {
  const prizeTypes = ["Wasted", "ExtraSpin", "TriipCredit"];
  const { prizeId } = useParams();
  const [loading, setLoading] = useState(true);
  const { actor } = useSelector(state => state.user);
  const [prize, setPrize] = useState({});

  const {
    control,
    reset,
    handleSubmit,
    getValues,
    formState: { isSubmitting }
  } = useForm();

  useEffect(() => {
    const getPrize = async () => {
      const result = await actor.readPrize(prizeId);
      setLoading(false);
      if ('ok' in result) {
        setPrize(result.ok);
      }
    };
    getPrize();
  }, [actor, prizeId]);

  useEffect(() => reset(prize), [reset, prize]);

  const prizeData = () => {
    const {
      prize_type,
      name,
      quantity,
      icon,
      description
    } = getValues();
    return {
      uuid: [prizeId],
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
        const result = await actor?.updatePrize(prizeId, prizeData());
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
            "NotFound": "Prize is not found."
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
    <Page title="Edit Prize | Triip Admin">
      {loading ? (<Loading />) :
        (
        <div className="wrapper">
          <AddPrizeBtn />
          <div className="content">
            <InputText
              control={control}
              placeHolder="Prize Type"
              label="Prize Type"
              name="prize_type"
              helperTextError={ERRORS}
              autocompleteOptions={prizeTypes}
            />
            <InputText
              control={control}
              placeHolder="Name"
              label="Prize Name"
              name="name"
              helperTextError={ERRORS}
            />
            <InputText
              control={control}
              placeHolder="Description"
              label="Prize Description"
              name="description"
              helperTextError={ERRORS}
            />
            <InputText
              control={control}
              placeHolder="Quantity"
              label="Quantity"
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
            <img
              className="prize_edit-img"
              src={prize.icon}
              // "https://triip-staging.imgix.net/triipme/staging/prize/icon/38/Asset_1.png"
              alt={prize.name}
            />
            <div className="footer_form">
              <div>
                <div>
                  <ButtonPrimary
                    loading={isSubmitting}
                    sx={{ mt: 2 }}
                    title="Save"
                    onClick={handleSubmit(onSubmit)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
export default EditPrize;

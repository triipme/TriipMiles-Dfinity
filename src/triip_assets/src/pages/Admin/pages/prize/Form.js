import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "./AddPrize.css";

import {
  ButtonPrimary,
  InputText
} from "../../../../components";

import { ERRORS } from "../../../../utils/constants";

const PrizeForm = () => {
  const { actor } = useSelector(state => state.user);
  const prizeTypes = ["Wasted", "ExtraSpin", "TriipCredit"];
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      prize_type: "",
      name: "",
      quantity: 0,
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
      uuid: [""],
      prize_type: prize_type,
      name: name,
      quantity: parseFloat(quantity),
      icon: icon,
      description: description,
      created_at: [0]
    };
  };

  const onSubmit = async () => {
    if (!!actor?.createPrize) {
      try {
        const result = await actor?.createPrize(prizeData());
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
      <div className="wrapper">
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
            placeHolder="Quantity"
            label="Prize Quantity"
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
          <InputText
            control={control}
            placeHolder="Description"
            label="Prize Description"
            name="description"
            helperTextError={ERRORS}
          />
          <div className="footer_form">
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
    </>
  );
}
export default PrizeForm;
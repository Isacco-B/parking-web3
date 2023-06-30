import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { loader } from "../assets";
import { CustomButton } from "../componets";
import { checkIfImage } from "../utils";
import { FormField } from "../componets";
import { useStateContext } from "../context";
import toast from "react-hot-toast";

function CreateParkingSpace() {
  const navigate = useNavigate();
  const [islLoading, setIsLoading] = useState(false);
  const { createParkingSpace, address } = useStateContext();
  const [form, setForm] = useState({
    city: "",
    streetAddress: "",
    postCode: "",
    pricePerHour: "",
    description: "",
    image: "",
  });

  function handleFormFieldChange(fieldName, e) {
    setForm({ ...form, [fieldName]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createParkingSpace({
          ...form,
          pricePerHour: ethers.utils.parseUnits(form.pricePerHour, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        toast.error("Provaide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  }

  return (
    <div className="bg-white flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="City *"
            placeholder="Your city"
            value={form.city}
            inputType="text"
            handleChange={(e) => handleFormFieldChange("city", e)}
          />
          <FormField
            labelName="Address *"
            placeholder="Your address"
            value={form.streetAddress}
            inputType="text"
            handleChange={(e) => handleFormFieldChange("streetAddress", e)}
          />
          <FormField
            labelName="Postcode *"
            placeholder="Your postcode"
            value={form.postCode}
            inputType="text"
            handleChange={(e) => handleFormFieldChange("postCode", e)}
          />
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Price/h *"
            placeholder="0.02 ETH"
            value={form.pricePerHour}
            inputType="text"
            handleChange={(e) => handleFormFieldChange("pricePerHour", e)}
          />
          <FormField
            labelName="Parking image *"
            placeholder="Place image URL"
            value={form.image}
            inputType="text"
            handleChange={(e) => handleFormFieldChange("image", e)}
          />
        </div>
        <FormField
          labelName="Description *"
          placeholder="Write parking info"
          value={form.description}
          isTextArea={true}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          {islLoading ? (
            <img
              src={loader}
              alt="loader"
              className="w-[100px] h-[100px] object-contain"
            />
          ) : (
            <CustomButton
              btnType="submit"
              title="Submit"
              styles="bg-[#1dc071]"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateParkingSpace;

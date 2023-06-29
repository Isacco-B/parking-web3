import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../componets";
import { maps, price, ownerIcon, loader, renter } from "../assets";
import { useStateContext } from "../context";
import { ethers } from "ethers";

function ParkingSpaceDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [hours, setHours] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { rentParkingSpace, address } = useStateContext();
  console.log(amount);

  const {
    Id,
    postCode,
    city,
    description,
    image,
    streetAddress,
    isAvailable,
    owner,
    renter,
    pricePerHour,
  } = state;

  const handleRentParking = async () => {
    setIsLoading(true);
    await rentParkingSpace(Id, hours, amount);
    navigate("/profile");
    setIsLoading(false);
  };

  return (
    <div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5 bg-white p-2 rounded-[15px] shadow-md">
        <div className="flex flex-1">
          <img
            src={image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-1 flex-col gap-[40px] lg:m-auto pl-3">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px text-black uppercase">
              address
            </h4>
            <div className="flex flex-row mt-[20px]">
              <img
                src={maps}
                alt="tag"
                className="w-[17px] h-[17px] object-contain"
              />
              <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#505051]">
                {city}
              </p>
              <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#505051]">
                {streetAddress}
              </p>
              <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#505051]">
                {postCode}
              </p>
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase mt-8">
                Description
              </h4>
              <div className="mt-[20px]">
                <div className="block">
                  <p className="font-epilogue font-semibold text-[#343434] text-[16px]">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase mt-8">
                Price
              </h4>
              <div className="mt-[20px]">
                <div className="flex flex-row  items-center">
                  <img
                    src={price}
                    alt="tag"
                    className="w-[17px] h-[17px] object-contain"
                  />
                  <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#505051]">
                    {pricePerHour} ETH /h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center">
          <div className="flex flex-col p-4 rounded-[10px]">
            <div className="flex flex-row  items-center">
              <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#505051] pr-3">
                Available:
              </p>
              <div
                className={
                  isAvailable
                    ? "w-[15px] h-[15px] rounded-full bg-green-500"
                    : "w-[15px] h-[15px] rounded-full bg-red-500"
                }
              ></div>
            </div>
            {address === owner ? (
              <div className="mt-[20px]">
                {isAvailable &&
                  renter === "0x0000000000000000000000000000000000000000" && (
                    <CustomButton
                      btnType="button"
                      title="Disable parking"
                      styles="w-full bg-[#f08080] mt-[20px]"
                      handleClick={handleRentParking}
                    />
                  )}
                {!isAvailable &&
                  renter !== "0x0000000000000000000000000000000000000000" && (
                    <CustomButton
                      btnType="button"
                      title="Unlock parking"
                      styles="w-full bg-[#4BB3FD] mt-[20px]"
                      handleClick={handleRentParking}
                    />
                  )}
              </div>
            ) : (
              <div className="mt-[20px]">
                <input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Min 1h"
                  step="1"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px] mt-2"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
                {isLoading ? (
                  <img
                    src={loader}
                    alt="loader"
                    className="w-[100px] h-[100px] object-contain"
                  />
                ) : (
                  <CustomButton
                    btnType="button"
                    title="Rent Parking"
                    styles="w-full bg-[#4BB3FD] mt-[20px]"
                    handleClick={handleRentParking}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParkingSpaceDetails;

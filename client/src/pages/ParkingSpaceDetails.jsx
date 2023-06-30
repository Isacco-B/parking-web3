import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton, Date, Loader } from "../componets";
import { maps, price, ownerIcon, renterIcon } from "../assets";
import { useStateContext } from "../context";

function ParkingSpaceDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [hours, setHours] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    rentParkingSpace,
    returnParkingSpace,
    setParkingSpaceAvailability,
    address,
  } = useStateContext();

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
    startTime,
    endTime,
  } = state;

  async function handleRentParking() {
    setIsLoading(true);
    await rentParkingSpace(Id, hours, amount);
    navigate("/profile");
    setIsLoading(false);
  }

  async function handleReturnParkingSpace() {
    setIsLoading(true);
    await returnParkingSpace(Id);
    navigate("/profile");
    setIsLoading(false);
  }

  async function handleSetAvailability() {
    setIsLoading(true);
    await setParkingSpaceAvailability(Id, !isAvailable);
    navigate("/profile");
    setIsLoading(false);
  }

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
        <div className="flex flex-1 flex-col gap-[40px] lg:m-auto pl-3 h-[410px] justify-center">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px text-black uppercase">
              address
            </h4>
            <div className="flex flex-row mt-[20px] items-center">
              <img
                src={maps}
                alt="tag"
                className="w-[17px] h-[17px] object-contain"
              />
              <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[14px] text-[#505051]">
                {city}
              </p>
              <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[14px] text-[#505051]">
                {streetAddress}
              </p>
              <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[14px] text-[#505051]">
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
                  <p className="ml-[12px] font-epilogue font-medium text-[14px] text-[#505051]">
                    {pricePerHour} ETH /h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[40px] lg:m-auto pl-3 h-[410px] justify-center">
          <div>
            <div className="lg:hidden bg-[#505051] h-[2px] w-full mb-3"></div>
            <div className="flex flex-row items-center gap-[3px]">
              <div className="w-[30px] h-[30px] flex items-center">
                <img
                  src={ownerIcon}
                  alt="owner"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
              <p className="flex-1 font-epilogue font-normal text-[14px] text-[#808191] truncate">
                by <span className="text-[#b2b3bd]">{owner}</span>
              </p>
            </div>
            <div className="flex flex-row items-center gap-[3px]">
              <div className="w-[30px] h-[30px] flex items-center">
                <img
                  src={renterIcon}
                  alt="owner"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
              <p className="flex-1 font-epilogue font-normal text-[14px] text-[#808191] truncate">
                by <span className="text-[#b2b3bd]">{renter}</span>
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-row  items-center">
              <p className="font-epilogue font-medium text-[16px] text-black mr-3 uppercase">
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
            {!isAvailable &&
              renter !== "0x0000000000000000000000000000000000000000" && (
                <Date date1={startTime} date2={endTime} />
              )}
          </div>

          {address === owner ? (
            <div className="mt-[20px]">
              {renter === "0x0000000000000000000000000000000000000000" && (
                <div className="flex flex-col items-center">
                  <CustomButton
                    btnType="button"
                    title={isAvailable ? "Disable parking" : "Enable parking"}
                    styles={
                      isAvailable
                        ? "min-w-[300px] bg-[#f08080] mr-2"
                        : "min-w-[300px] bg-[#1dc071] mr-2"
                    }
                    handleClick={handleSetAvailability}
                  />
                  <Loader isLoading={isLoading} />
                </div>
              )}
              {!isAvailable &&
                renter !== "0x0000000000000000000000000000000000000000" && (
                  <div className="flex flex-col items-center">
                    <div className="block w-full m-auto">
                      <p className="uppercase font-epilogue font-semibold text-[14px] text-[#505051] mb-2">
                        unlock the parking and get the reward
                      </p>
                      <CustomButton
                        btnType="button"
                        title="Unlock parking"
                        styles="w-full bg-[#4BB3FD] mr-2"
                        handleClick={handleReturnParkingSpace}
                      />
                      <div className="flex items-center justify-center">
                        <Loader isLoading={isLoading} />
                      </div>
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div>
              {isAvailable && address && (
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
                  <div className="flex flex-col items-center mt-2">
                    <CustomButton
                      btnType="button"
                      title="Rent Parking"
                      styles="w-full bg-[#4BB3FD] mr-2"
                      handleClick={handleRentParking}
                    />
                    <Loader isLoading={isLoading} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ParkingSpaceDetails;

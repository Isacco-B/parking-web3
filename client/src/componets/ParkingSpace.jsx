import React from "react";
import { useNavigate } from "react-router-dom";
import FundCard from "./FundCard";
import { loader } from "../assets";

function ParkingSpace({ title, isLoading, parkingSpace }) {
  const navigate = useNavigate();

  function handleNavigate(parkingSpace) {
    navigate(`/parking-details/${parkingSpace.Id}`, {
      state: parkingSpace,
    });
  }

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center w-full h-[300px] bg-white items-center">
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        </div>
      )}
      <h1 className="font-epilogue font-semibold text-[18px] text-black text-left">
        {title} ({parkingSpace.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {!isLoading && parkingSpace.length === 0 && (
          <p className="font-epilogue font-semibold text-[#818183] text-[14px] leading-[30px]">
            No parking available.
          </p>
        )}
        {!isLoading &&
          parkingSpace.length > 0 &&
          parkingSpace.map((parking, i) => (
            <FundCard
              key={i}
              {...parking}
              handleClick={() => handleNavigate(parking)}
            />
          ))}
      </div>
    </div>
  );
}
export default ParkingSpace;

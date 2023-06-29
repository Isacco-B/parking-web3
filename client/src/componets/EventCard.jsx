import React from "react";
import { ownerIcon } from "../assets";
import CustomButton from "./CustomButton";


function EventCard({ data, eventName, transaction }) {
  return (
    <div>
      {/* {isLoading && (
        <div className="flex justify-center w-full h-[300px] bg-white items-center">
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        </div>
      )} */}
      <div className="flex flex-row bg-white h-[69px] shadow-md rounded-md justify-between items-center p-4">
        <div className="bg-[#4BB3FD] p-2 rounded-[10px]">
          <p className="font-epilogue font-semibold text-[13px] text-white">
            {eventName}
          </p>
        </div>
        <div className="flex flex-row  items-center">
          <img
            src={ownerIcon}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#505051] truncate">
            {data.owner}
          </p>
        </div>
        <CustomButton btnType="button" title={"View"} styles={"bg-[#1dc071]"} />
      </div>
    </div>
  );
}

export default EventCard;

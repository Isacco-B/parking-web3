import React from "react";
import { ownerIcon } from "../assets";
import CustomButton from "./CustomButton";


function EventCard({ data, eventName, transaction }) {
  return (
    <div>
      <div className="flex flex-row bg-white h-[69px] shadow-md rounded-md justify-between items-center p-4">
        <div className="p-2 rounded-[10px]">
          <p className="font-epilogue font-semibold text-[13px] text-black uppercase">
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
            {transaction.address}
          </p>
        </div>
        <CustomButton
          btnType="button"
          title={"View"}
          styles={"bg-[#4BB3FD] "}
        />
      </div>
    </div>
  );
}

export default EventCard;

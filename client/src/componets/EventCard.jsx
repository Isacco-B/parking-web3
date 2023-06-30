import React from "react";
import CustomButton from "./CustomButton";

function EventCard({ eventName, handleClick }) {
  return (
    <div>
      <div className="flex flex-row bg-white h-[69px] shadow-md rounded-md justify-between items-center p-4">
        <div className="p-2 rounded-[10px]">
          <p className="font-epilogue font-semibold text-[13px] text-black uppercase">
            {eventName}
          </p>
        </div>
        <CustomButton
          btnType="button"
          title={"View"}
          styles={"bg-[#4BB3FD] "}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export default EventCard;

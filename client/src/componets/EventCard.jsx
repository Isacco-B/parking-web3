import React from "react";

function EventCard({ eventName }) {
  return (
    <div className="bg-white h-[69px] shadow-md rounded-md p-4 min-w-[280px] flex items-center justify-center">
      <p className="font-epilogue font-semibold text-[13px] text-black uppercase">
        {eventName}
      </p>
    </div>
  );
}

export default EventCard;

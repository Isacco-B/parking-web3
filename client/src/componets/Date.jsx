import React, { useEffect, useState } from "react";
import parseDate from "../utils";
import { clock } from "../assets";

function Date({ date1, date2 }) {
  const [date, setDate] = useState([]);

  useEffect(() => {
    const data = parseDate(date1, date2);
    setDate(data);
  }, []);

  const { start, end } = date;

  return (
    <div className="flex flex-row items-center mt-2 gap-3">
      <img
        src={clock}
        alt="clock"
        className="w-[17px] h-[17px] object-contain"
      />
      <p className="font-normal text-[#505051] text-[14px]">
        {start} - {end}
      </p>
    </div>
  );
}

export default Date;

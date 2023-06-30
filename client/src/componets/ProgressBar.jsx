import React from 'react'
import { calculateBarPercentage } from '../utils';


function ProcessBar({ endTime }) {
  return (
    <div className="relative w-full h-[5px] bg-[#3a3a43] mt-1">
      <div
        className="absolute h-full bg-[#4acd8d]"
        style={{
          width: `${calculateBarPercentage(endTime)}%`,
          maxWidth: "100%",
        }}
      ></div>
    </div>
  );
}

export default ProcessBar


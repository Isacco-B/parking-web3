import React from 'react'

function ProcessBar() {
  return (
    <div
      className="absolute h-full bg-[#4acd8d]"
      style={{
        width: `${calculateBarPercentage(startTime, endTime)}%`,
        maxWidth: "100%",
      }}
    ></div>
  );
}

export default ProcessBar

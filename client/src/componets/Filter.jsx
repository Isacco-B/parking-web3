import React from "react";

function Filter() {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex flex-row justify-center gap-10 h-[40px]">
        <button className="text-[black] uppercase font-epilogue font-semibold text-[14px]">
          All
        </button>
        <button className="text-[black] uppercase font-epilogue font-semibold text-[14px]">
          Aviable
        </button>
        <button className="text-[black] uppercase font-epilogue font-semibold text-[14px]">
          Not aviable
        </button>
      </div>
      <div className="h-[3px] w-[300px] bg-[#d2c9c9] shadow-mg rounded-md"></div>
    </div>
  );
}

export default Filter;

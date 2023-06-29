import React from "react";
import { loader } from "../assets";

function Loader({ isLoading }) {
  return (
    <div className="flex items-center">
      {isLoading && (
        <img src={loader} alt="loader" className="w-[45px] h-[45px]" />
      )}
    </div>
  );
}

export default Loader;

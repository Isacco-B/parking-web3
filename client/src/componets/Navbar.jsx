import React, { useState } from "react";
import { logo, metamask } from "../assets";
import { CustomButton } from '../componets'
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";


function Navbar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const { connect, address } = useStateContext();

  return (
    <div className="flex flex-row justify-between items-center h-[69px] w-full px-6 rounded-[10px] mb-9">
      <div className="bg-white p-3 rounded-full shadow-md">
        <img
          src={logo}
          alt="logo"
          className="w-[40px] h-[40px] cursor-pointer"
        />
      </div>
      <div className="flex flex-row items-center gap-3">
        <CustomButton
          btnType="button"
          title={address ? "Add Parking" : "Connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#f08080]"}
          handleClick={() => {
            if (address) {
              navigate("/add-parking");
            } else {
              connect();
            }
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;

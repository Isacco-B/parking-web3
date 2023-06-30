import React, { useState } from "react";
import { logo, menu } from "../assets";
import { CustomButton } from '../componets'
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { navlinks } from "../constants";


function Navbar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
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
      {/* Small screen navigation */}

      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="logo"
            className="w-[60%] h-[60%] object-contain"
            onClick={() => navigate("/")}
          />
        </div>
        <img
          src={menu}
          alt="menu"
          className="w-[34PX] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer(!toggleDrawer)}
        />
        <div
          className={`absolute top-[60px] rounded-[10px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "-translate-y-0"
          } transition-all duration-700 `}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4 items-center justify-center">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) {
                  navigate("/create-campaign");
                  setToggleDrawer(false);
                } else {
                  (connect());
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

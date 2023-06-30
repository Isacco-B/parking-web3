import React, { useState } from "react";
import { logo, menu } from "../assets";
import { CustomButton } from "../componets";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { navlinks } from "../constants";

function Navbar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="sm:flex hidden flex-row justify-between gap-4 items-center w-full">
        <Link to="/">
          <div className="w-[52px] h-[52px] flex justify-center items-center cursor-pointer">
            <img
              src={logo}
              alt="thirdweb"
              className="w-[80%] h-[80%] object-contain"
            />
          </div>
        </Link>
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

      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="logo"
            className="w-[70%] h-[70%] object-contain"
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
          className={`absolute top-[60px] rounded-[10px] right-0 left-0 bg-[white] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-x-[100vh]" : "-translate-x-0"
          } transition-all duration-700 `}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#c1fba4]"
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
                    isActive === link.name ? "text-[black]" : "text-[#808191]"
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
      </div>
    </div>
  );
}

export default Navbar;

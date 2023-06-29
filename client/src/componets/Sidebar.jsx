import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navlinks } from "../constants";

function Icon({ styles, name, imgUrl, isActive, disable, handleClick }) {
  return (
    <div
      className={` h-[48px] w-full rounded-[10px] ${
        isActive && isActive === name && "bg-[#c1fba4]"
      } flex justify-center items-center ${
        !disable && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className="flex items-center">
      <div className="flex flex-col justify-center items-center gap-3 bg-white h-1/2 w-[69px] p-2 shadow-md rounded-[10px] max-h-[330px]">
        {navlinks.map((link, i) => (
          <Icon
            key={i}
            {...link}
            isActive={isActive}
            handleClick={() => {
              if (!link.disabled) {
                setIsActive(link.name);
                navigate(link.link);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

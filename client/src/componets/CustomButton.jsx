import React from "react";

function CustomButton({ btnType, title, styles, handleClick, disabled}) {
  return (
    <button
      type={btnType}
      className={`${styles} font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}

export default CustomButton;

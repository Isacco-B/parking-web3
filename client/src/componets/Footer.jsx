import React from "react";
import { start2impact } from "../assets";
import { socialLinks } from "../constants";

function Footer() {
  return (
    <div className="bg-white flex flex-col justify-around items-center mt-[50px] h-[69px] w-full p-6 shadow-md rounded-[10px] sm:flex-row">
      <div className="flex flex-row items-center gap-2">
        <img
          src={start2impact}
          alt="logo-start2impact"
          className="w-[25px] h-[25px] object-contain"
        />
        <p className="font-epilogue font-semibold">Ethereum Web3</p>
      </div>
      <div className="flex flex-row items-center justify-between gap-5">{socialLinks.map((link)=> {
        const {img, label, href, id} = link;
        return (
          <a key={id} href={href} target="black" aria-label={label}>
            <img src={img} alt={label} className="w-[20px] h-[20px] object-contain"/>
          </a>
        )
      })}</div>
      <p className="font-epilogue font-semibold">Isacco Bertoli</p>
    </div>
  );
}

export default Footer;

import React, { createContext, useContext } from "react";
import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x9f9619CD2dd4B0CE798842b750F6273Ad43bB3A5"
  );

  const address = useAddress();
  const connect = useMetamask();


  async function createParkingSpace(form) {
    try {
      const data = await contract.call("createParkingSpace", [
        form.city,
        form.streetAddress,
        form.postCode,
        form.description,
        form.pricePerHour,
        form.image,
      ]);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

  async function rentParkingSpace(Id, hours, amount) {
    try {
      const data = await contract.call("rentParkingSpace", [Id, hours], {
        value: ethers.utils.parseEther(amount),
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

  async function returnParkingSpace(id) {
    try {
      const data = await contract.call("returnParkingSpace", [id]);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

  async function setParkingSpaceAvailability(id, type) {
    try {
      const data = await contract.call("setParkingSpaceAvailability", [
        id,
        type,
      ]);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

  async function getParkingSpace() {
    const parkingSpace = await contract.call("getParkingSpace");
    const parsedParkingSpace = parkingSpace.map((item, i) => ({
      owner: item.owner,
      renter: item.renter,
      city: item.city,
      postCode: ethers.utils.hexValue(item.postCode),
      streetAddress: item.streetAddress,
      description: item.description,
      startTime: ethers.utils.formatEther(item.startTime.toString()),
      endTime: ethers.utils.formatEther(item.endTime.toString()),
      pricePerHour: ethers.utils.formatEther(item.pricePerHour.toString()),
      isAvailable: item.isAvailable,
      image: item.image,
      Id: i,
    }));
    return parsedParkingSpace;
  }

  async function getRenterAddress(id) {
    const renterAddress = await contract.call("getRenterAddress", [id]);
    return renterAddress;
  }

  return (
    <StateContext.Provider
      value={{
        contract,
        address,
        connect,
        createParkingSpace,
        rentParkingSpace,
        returnParkingSpace,
        setParkingSpaceAvailability,
        getParkingSpace,
        getRenterAddress,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

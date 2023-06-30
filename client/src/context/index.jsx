import React, { createContext, useContext } from "react";
import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

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
      toast.success("Parking successfully added");
    } catch (error) {
      const { reason } = error;
      toast.error(reason);
    }
  }

  async function rentParkingSpace(Id, hours, amount) {
    try {
      const data = await contract.call("rentParkingSpace", [Id, hours], {
        value: ethers.utils.parseEther(amount),
      });
      toast.success("successfully rented parking");
    } catch (error) {
      const { reason } = error;
      toast.error(reason);
    }
  }

  async function returnParkingSpace(id) {
    try {
      const data = await contract.call("returnParkingSpace", [id]);
      toast.success("parking unlocked successfully");
    } catch (error) {
      const { reason } = error;
      toast.error(reason);
    }
  }

  async function setParkingSpaceAvailability(id, type) {
    try {
      const data = await contract.call("setParkingSpaceAvailability", [
        id,
        type,
      ]);
      toast.success("Parking state changed successfully");
    } catch (error) {
      const { reason } = error;
      toast.error(reason);
    }
  }

  async function getParkingSpace() {
    const parkingSpace = await contract.call("getParkingSpace");
    const parsedParkingSpace = parkingSpace.map((item, i) => ({
      owner: item.owner,
      renter: item.renter,
      city: item.city,
      postCode: parseInt(item.postCode),
      streetAddress: item.streetAddress,
      description: item.description,
      startTime: item.startTime.toString(),
      endTime: item.endTime.toString(),
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

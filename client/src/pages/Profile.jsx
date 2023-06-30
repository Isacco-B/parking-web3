import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { ParkingSpace } from "../componets";

function Profile() {
  const [parkingSpace, setParkingSpace] = useState("");
  const [rentedParkingSpace, setRentedParkingSpace] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { address, contract, getParkingSpace } = useStateContext();

  async function fetchparkingSpace() {
    setIsLoading(true);
    const data = await getParkingSpace();
    const yourParkingSpace = data.filter(
      (parking) => parking.owner === address
    );
    const rentedParkingSpace = data.filter(
      (parking) => parking.renter === address
    );
    setParkingSpace(yourParkingSpace);
    setRentedParkingSpace(rentedParkingSpace);
    setIsLoading(false);
  }

  useEffect(() => {
    if (contract) {
      fetchparkingSpace();
    }
  }, [contract, address]);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <ParkingSpace
          title="Your parking spaces"
          isLoading={isLoading}
          parkingSpace={parkingSpace}
        />
      </div>
      <div className="w-full bg-white h-[33px] rounded-[10px] shadow-md"></div>
      <div>
        <ParkingSpace
          title="Rented parking spaces"
          isLoading={isLoading}
          parkingSpace={rentedParkingSpace}
        />
      </div>
    </div>
  );
}

export default Profile;

import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { Filter, ParkingSpace } from "../componets";

function Home() {
  const [parkingSpace, setParkingSpace] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { address, contract, getParkingSpace } = useStateContext();

  async function fetchparkingSpace() {
    setIsLoading(true);
    const data = await getParkingSpace();
    console.log(data)
    setParkingSpace(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (contract) {
      fetchparkingSpace();
    }
  }, [contract, address]);

  return (
    <div>
      <Filter/>
      <ParkingSpace
        title="Parking spaces available"
        isLoading={isLoading}
        parkingSpace={parkingSpace}
      />
    </div>
  );
}

export default Home;

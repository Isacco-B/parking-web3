import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { EventCard } from "../componets";
import { loader } from "../assets";

function Events() {
  const [events, setEvents] = useState([]);
  const { contract, address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAllEvents() {
      setIsLoading(true);
      const allEvents = await contract.events.getAllEvents();
      setEvents(allEvents);
      setIsLoading(false);
    }
    getAllEvents();
  }, [contract, address]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="font-epilogue font-semibold text-[28px]">Events</p>
      {isLoading && (
        <div className="flex justify-center items-center m-[20px]">
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        </div>
      )}
      <div className="flex items-center max-w-[800px] mt-[20px]">
        <div className="flex flex-wrap w-full gap-4 justify-center">
          {events.map((event, i) => (
            <EventCard key={i} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;

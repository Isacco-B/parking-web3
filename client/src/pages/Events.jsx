import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
// import { useNavigate } from "react-router-dom";
import { EventCard } from "../componets";
import { loader } from "../assets";


function Events() {
  const [events, setEvents] = useState([]);
  const { contract, address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false)

  // const navigate = useNavigate()

  // function handleNavigate(event) {
  //   navigate(`/event-details/${parkingSpace.Id}`, {
  //     state: parkingSpace,
  //   });
  // }

  useEffect(() => {
    async function getAllEvents() {
      setIsLoading(true)
      const allEvents = await contract.events.getAllEvents();
      setEvents(await allEvents);
      setIsLoading(false)
      console.log(events);
    }
    getAllEvents();
  }, [contract, address]);

  return (
    <div className="flex flex-col w-full gap-4">
      {isLoading && (
        <div className="flex justify-center w-full h-[300px] bg-white items-center">
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        </div>
      )}
      <p className="font-epilogue capitalize font-semibold">Events</p>
      {events.map((event, i) => (
        <EventCard key={i} {...event} isLoading={isLoading} />
      ))}
    </div>
  );
}

export default Events;

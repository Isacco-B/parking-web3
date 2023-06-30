import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { EventCard, Modal } from "../componets";
import { loader } from "../assets";


function Events() {
  const [events, setEvents] = useState([]);
  const { contract, address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);

function handleClick() {
  setShowModal(true)
}

  useEffect(() => {
    async function getAllEvents() {
      setIsLoading(true)
      const allEvents = await contract.events.getAllEvents();
      console.log(allEvents)
      setEvents(allEvents);
      setIsLoading(false)
    }
    getAllEvents();
  }, [contract, address]);

  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal}/>
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
        <p className="font-epilogue font-semibold uppercase">Events</p>
        {events.map((event, i) => (
          <EventCard
            key={i}
            {...event}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Events;

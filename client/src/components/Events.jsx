import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import TextShine from "./TextShine";

const Events = () => {
  const url = "https://valorant-api.com/v1/events";
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setEvents(response.data.data);
        // console.log(response.data.events);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);
  return (
    <>
      <div className="tracking-wider text-center mt-5">
        <TextShine name={"Events"} />
        <p className="mt-4 font-medium text-[18px]">List of events happening around the world.</p>
      </div>
      <div className="flex flex-wrap mt-8 justify-center sm:gap-4">
          <EventCard events={events} />
      </div>
    </>
  );
};

export default Events;

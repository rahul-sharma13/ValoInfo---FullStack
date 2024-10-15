import React from "react";

export const EventSection = ({ para, head, add }) => (
  <div className={add}>
    <p className="text-accent-foreground md:text-[12px] text-[9px]">{para}</p>
    <h2 className="text-gray-500 font-thin">{head}</h2>
  </div>
);

const EventCard = ({ events }) => {
    return (
    <>
      {events.map((event, index) => (
        <div
          className="bg-accent text-black sm:h-28 h-36 tracking-wider max-w-fit flex justify-between mb-4"
          key={index}
        >
          {/* Name and details up-down */}
          <div className="mx-3 my-auto sm:w-[400px] w-[200px]">
            {/* name */}
            <div className="font-semibold text-[18px] mb-2 text-accent-foreground">
              {event.event_name}
            </div>
            {/* details */}
            <div className="flex text-[14px] gap-10">
              <EventSection para={event.event_date} head={"Dates"} add={"w-[50%]"} />
              <EventSection para={event.region} head={"Region"} add={"w-[20%]"} />
              <EventSection para={event.prize_pool} head={"Prize"} add={"w-[20%]"} />
            </div>
          </div>
          <div
            className="w-24 h-full flex p-4 dark:bg-[#334155] bg-[#cbd5e1]"
          >
            <img alt="event" src={event.event_logo} className="object-contain" />
          </div>
        </div>
      ))}
    </>
  );
};

export default EventCard;
import React from "react";

const EventSection = ({ para, head }) => (
    <div className="">
      <p className="text-accent-foreground">{para}</p>
      <h2 className="text-gray-500 font-thin">{head}</h2>
    </div>
  );
  
  const EventCard = ({ events }) => {
    return (
      <>
        {events.map((event, index) => (
          <div
            className="bg-accent text-black sm:h-28 h-36 tracking-wider sm:max-w-screen-2xl  flex justify-between mb-4"
            key={index}
          >
            {/* Name and details up-down */}
            <div className="mx-3 my-auto sm:w-[400px] w-[200px]">
              {/* name */}
              <div className="font-semibold text-[18px] mb-2 text-accent-foreground">
                {event.displayName}
              </div>
              {/* details */}
              <div className="flex text-[14px] gap-10">
                <EventSection para={event.startTime} head={"Start Time"} />
                {/* dates */}
                <EventSection para={event.endTime} head={"End Time"} />
              </div>
            </div>
            <div
              className="w-24 flex p-4 dark:bg-[#334155] bg-[#cbd5e1]"
            />
          </div>
        ))}
      </>
    );
  };
  
  export default EventCard;
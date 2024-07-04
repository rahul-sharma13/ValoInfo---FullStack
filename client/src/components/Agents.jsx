import axios from "axios";
import { useEffect, useState } from "react";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TextShine from "./TextShine";
import { Link } from "react-router-dom";

const Agents = () => {
  const url = "https://valorant-api.com/v1/agents?isPlayableCharacter=true"; //filtering to not show the duplicated sova.
  const [agents, setAgents] = useState([]);
  const [role, setRole] = useState("Initiator");
  const lists = ["Initiator", "Controller", "Duelist", "Sentinel"];


  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data.data);
        setAgents(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  return (
    <>
      <div className="text-center sm:mt-5 mt-8">
        <TextShine name={"Agents"} />
      </div>
      <div className="mx-auto bg-accent mt-8 flex sm:w-[576px] w-[350px] items-center h-20 rounded-2xl shadow-lg font-poppins justify-center sm:gap-8 gap-4">
        {lists.map((list, index) => (
          <li
            key={index}
            className="font-bold tracking-wider sm:text-[18px] text-[15px] cursor-pointer list-none hover:scale-110 transition-all transform duration-300"
            onClick={() => setRole(list)}
            value={list}
          >
            {list}
          </li>
        ))}
      </div>

      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
      >
        {agents.map((agent, index) => (
          agent.role.displayName == role ? (
            <SwiperSlide key={index}>
              <div className="max-w-5xl sm:h-[500px] h-[340px] mx-auto sm:mb-6 flex tracking-wider">
                {/* left */}
                <div className="hidden sm:block">
                  <img
                    src={agent?.fullPortrait}
                    className="h-[512px] w-[512px] object-contain"
                    loading="lazy"
                  />
                </div>
                {/* right */}
                <div className=" my-auto">
                  <Link to={`/${agent.uuid}`}>
                    <p className="text-[18px] sm:text-left sm:ml-0 ml-8 text-center font-bold cursor-pointer">
                      {agent?.displayName}
                      <span className=" text-gray-600">
                        ({agent?.developerName})
                      </span>
                    </p>
                  </Link>
                  <p className="sm:text-left text-center sm:ml-0 ml-4">{agent?.role?.displayName}</p>

                  <div className="sm:max-w-[475px] max-w-xs sm:p-0 p-2 sm:mx-0 mx-4 sm:text-left text-center sm:mt-5 text-[14px] leading-7">
                    {agent?.description}
                  </div>

                  <p className="text-[12px] sm:block hidden mt-4 text-gray-500">
                    (click on agent name to get ability details)
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ) : ""
        ))}
      </Swiper>
    </>
  );
};

export default Agents;
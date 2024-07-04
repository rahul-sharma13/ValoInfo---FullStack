import axios from "axios";
import { useEffect, useState } from "react";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import TextShine from "./TextShine";

const Maps = () => {
  const url = "https://valorant-api.com/v1/maps";
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data.data);
        setMaps(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[url]);
  return (
    <>
      <div className="text-center sm:mt-5 mt-3">
        <TextShine name={"Maps"} />
      </div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
      >
        {maps.map((map, index) => (
          <SwiperSlide key={index}>
            <div className="max-w-5xl sm:h-[500px] h-[300px] mx-auto flex gap-10 tracking-wider">
              {/* left */}
              <div className="sm:block mx-auto my-auto">
                <img
                  src={map?.splash}
                  className="sm:h-[512px] h-[250px] sm:w-[512px] w-[300px] object-contain mt-5"
                />
                <p className="text-center">{map?.displayName}</p>
              </div>
              {/* right */}
              <div className=" my-auto sm:block hidden">
                <p className="text-[18px] font-bold">
                  {map?.displayName}
                  <span className=" text-gray-600">
                    ({map?.tacticalDescription})
                  </span>
                </p>
                <div className="max-w-[475px] mt-5 text-[14px] leading-7">
                  {map?.narrativeDescription}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Maps;
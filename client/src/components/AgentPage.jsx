import React, { useEffect, useState } from "react";
import TextShine from "./TextShine";
import { useParams } from "react-router-dom";
import axios from "axios";

const AgentPage = () => {
  const params = useParams();
  // console.log(params); params return an object. it holds the value given after colon ":" in dynamic path.
  const url = `https://valorant-api.com/v1/agents/${params.uuid}`;
  const [abilities, setAbilities] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setAbilities(response.data.data.abilities);
        setDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  return (
    <>
      <div className="mb-5 text-center">
        <TextShine name={details.displayName} />
      </div>
      <img src={details.displayIcon} className="mx-auto h-28 object-contain" />
      <div className="my-10 font-poppins">
        <div className="text-center mb-5">
          <TextShine name={"ABILITIES"} />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-row items-start justify-center gap-10 tracking-wider p-3">
            {abilities.slice(0, 2).map((ability, index) => (
              <div key={index}>
                <h2 className="sm:text-[18px] sm:font-bold font-normal mb-2 text-[14px]">
                  {ability?.slot} : <span className="text-[16px]">{ability?.displayName}</span>
                </h2>
                <div className="max-w-[575px] dark:text-gray-400 sm:text-[16px] text-[12px]">
                  {ability?.description}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-start justify-center gap-10 tracking-wider p-3">
            {abilities.slice(2, 4).map((ability, index) => (
              <div key={index}>
                <h2 className="sm:text-[18px] sm:font-bold font-normal mb-2 text-[14px]">
                  {ability?.slot} : <span className="text-[16px]">{ability?.displayName}</span>
                </h2>
                <div className="max-w-[575px] dark:text-gray-400 sm:text-[16px] text-[12px]">
                  {ability?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentPage;
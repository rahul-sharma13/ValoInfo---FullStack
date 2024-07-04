import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { Regions, episodes } from '../constants';
import LeaderBoardTable from '../components/LeaderBoardTable';
import TextShine from '../components/TextShine';

const Leaderboard = () => {
  const [ranks, setRanks] = useState([]);
  const [eaMenu, setEaMenu] = useState(false);
  const [regionMenu, setRegionMenu] = useState(false);

  const [episodeAct, setEpisodeAct] = useState('e5a1');
  const [currentRegion, setCurrentRegion] = useState('eu');

  // to change region acc to shortform required in API
  const handleRegion = (currentRegion) => {
    const regionMap = {
      "North-America": "na",
      "Latam": "latam",
      "Korea": "kr",
      "Brazil": "br",
      "Asia-pacific": "ap",
      "eu": "eu"
    };

    return regionMap[currentRegion] || "eu";
  }

  const url = `https://api.henrikdev.xyz/valorant/v1/leaderboard/${handleRegion(currentRegion)}?season=${episodeAct}&api_key=${import.meta.env.VITE_API_KEY}`;

  // opening or closing or menu by click on heading
  const handleEaMenu = () => {
    setEaMenu((prevValue) => !prevValue)
  }
  const handleRegionMenu = () => {
    setRegionMenu((prevValue) => !prevValue);
  }

  // to get API response
  useEffect(() => {
    axios.get(url).then((response) => {
      // console.log(response?.data);
      setRanks(response?.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [url])

  return (
    <>
      <div className='mt-5 flex gap-5 ml-36'>
        <div className='h-10 w-36 py-1 bg-background border-2 px-4 rounded-2xl flex items-center justify-start gap-2 text-[14px] font-bold cursor-pointer' onClick={handleEaMenu}>
          <span className=''>Episode-act</span>{eaMenu ? (<BiSolidUpArrow size={10} className='mt-1' />) : (<BiSolidDownArrow size={10} className='mt-1' />)}
        </div>
        <div>
          <div className='h-10 w-28 py-1 bg-background border-2 px-4 rounded-2xl flex items-center justify-start gap-2 text-[14px] font-bold cursor-pointer' onClick={handleRegionMenu}>
            <span className=''>Region</span>{regionMenu ? (<BiSolidUpArrow size={10} className='mt-1' />) : (<BiSolidDownArrow size={10} className='mt-1' />)}
          </div>
        </div>
      </div>

      <div className='uppercase flex justify-center gap-10 mt-3'>
        <TextShine name={currentRegion} />
        <TextShine name={episodeAct} />
      </div>

      {/* epside menu */}
      <div className={eaMenu ? 'h-24 absolute z-10 w-36 bg-background border-2 flex flex-col rounded-2xl left-36 top-36 items-center overflow-y-scroll no-scrollbar' : 'hidden'}>
        {episodes.map((episode, index) => (
          <h1 key={index} className={`cursor-pointer py-1 ${index === episodes.length - 1 ? 'mb-2' : 'mb-0'} hover:text-gray-400 font-semibold tracking-wider`} onClick={() => {
            (setEpisodeAct(episode.toLowerCase().replace('-', '')));
            setEaMenu((prevValue) => !prevValue)
          }}>
            {episode}
          </h1>
        ))}
      </div>

      {/* region menu */}
      <div className={regionMenu ? 'h-24  absolute z-10 w-28 bg-background border-2 flex flex-col rounded-2xl left-[305px] top-36 items-center overflow-auto overflow-y-scroll no-scrollbar font-semibold ' : 'hidden'} >
        {Regions.map((region, index) => (
          <h1 key={index} className={`text-[14px] cursor-pointer py-1 ${index === Regions.length - 1 ? 'mb-2' : 'mb-0'} hover:text-gray-400 `} onClick={() => {
            (setCurrentRegion(region));
            setRegionMenu((prevValue) => !prevValue)
          }}>
            {region}
          </h1>
        ))}
      </div>

      <LeaderBoardTable ranks={ranks} act={episodeAct} />
    </>
  )
}

export default Leaderboard
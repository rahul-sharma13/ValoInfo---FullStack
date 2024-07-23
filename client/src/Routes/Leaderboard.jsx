import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Regions, episodes } from '../constants';
import LeaderBoardTable from '../components/LeaderBoardTable';
import TextShine from '../components/TextShine';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const Leaderboard = () => {
  const [ranks, setRanks] = useState([]);

  const [episodeAct, setEpisodeAct] = useState('e7a3');
  const [currentRegion, setCurrentRegion] = useState('eu');

  const [loading, setLoading] = useState(true);

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


  // to get API response
  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.henrikdev.xyz/valorant/v2/leaderboard/${handleRegion(currentRegion)}?season=${episodeAct}&api_key=${import.meta.env.VITE_API_KEY}`).then((response) => {
      setLoading(false);
      // console.log(response);
      setRanks(response?.data?.players);
    }).catch((error) => {
      setLoading(false);
      console.log(error);
    })
  }, [currentRegion, episodeAct]);

  // console.log(currentRegion);
  const handleRegionChange = (value) => {
    setCurrentRegion(value);
  }

  const handleEpisodeChange = (value) => {
    setEpisodeAct(value.toLowerCase().replace('-', ''));
  }

  return (
    <>
      <div className='mt-5 flex gap-5 ml-48'>
        <Select onValueChange={handleEpisodeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Episode" />
          </SelectTrigger>
          <SelectContent>
            {
              episodes.map((episode, index) => (
                <SelectItem key={index} value={episode}>
                  {episode}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <Select onValueChange={handleRegionChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent >
            {
              Regions.map((region, index) => (
                <SelectItem 
                  key={index}
                  value={region}
                >
                  {region}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className='uppercase flex justify-center gap-10 mt-3'>
        <TextShine name={currentRegion} />
        <TextShine name={episodeAct} />
      </div>

      <LeaderBoardTable ranks={ranks} act={episodeAct} loading={loading} />
    </>
  )
}

export default Leaderboard
import axios from 'axios';
import React, { useState } from 'react';
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
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '../components/ui/skeleton';

const Leaderboard = () => {
    const [episodeAct, setEpisodeAct] = useState('e7a3');
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

    const handleRegionChange = (value) => {
        setCurrentRegion(value);
    }

    const handleEpisodeChange = (value) => {
        setEpisodeAct(value.toLowerCase().replace('-', ''));
    }

    const { data, isError, isLoading } = useQuery(
        {
            queryKey: ['leaderboard', currentRegion, episodeAct],
            queryFn: async () => {
                const res = await axios.get(`https://api.henrikdev.xyz/valorant/v2/leaderboard/${handleRegion(currentRegion)}?season=${episodeAct}&api_key=${import.meta.env.VITE_API_KEY}`);
                return res.data;
            }
        }
    )


    return (
        <>
            <div className='mt-5 flex gap-5 md:ml-48 ml-2'>
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

            <div className='uppercase flex justify-center gap-10 mt-5'>
                <TextShine name={currentRegion} />
                <TextShine name={episodeAct} />
            </div>

            {
                isLoading ? (
                    <Skeleton className="max-w-4xl h-96 mx-auto mt-10" />
                ) : (
                    data && data.players && data.players.length > 0 &&
                    <LeaderBoardTable
                        ranks={data.players}
                        act={episodeAct}
                        error={isError}
                    />
                )
            }
        </>
    )
}

export default Leaderboard
import React, { useEffect, useState } from "react";
import axios from "axios";

const Ranking = () => {

    const lists = ["Europe", "Oceania", "North-America", "China"];
    const [region, setRegion] = useState("Europe");
    const [rankings, setRankings] = useState([]);

    const url = `api/rankings/${region}`;

    useEffect(() => {
        axios.get(url).then((response) => {
            setRankings(response.data.teams);
            // console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [url]);

    return (
        <div>
            <div className="mx-auto bg-accent mt-8 flex max-w-xl items-center h-20 rounded-2xl shadow-lg font-poppins justify-center gap-8">
                {lists.map((list, index) => (
                    <li
                        key={index}
                        className="font-bold tracking-wider text-[18px] cursor-pointer list-none hover:scale-110 transition-all transform duration-300"
                        onClick={() => setRegion(list)}
                        value={list}
                    >
                        {list}
                        {/* {console.log(region)} */}
                    </li>
                ))}
            </div>
            <div className=" max-w-4xl mx-auto mb-8 overflow-hidden rounded-lg shadow-lg mt-10 font-poppins">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="tracking-wide text-left bg-accent text-accent-foreground uppercase border-b border-gray-600">
                                <th className="px-4 py-3">TEAM</th>
                                <th className="px-4 py-3">RANKING</th>
                                <th className="px-4 py-3">SCORE</th>
                                <th className="px-4 py-3">WINNINGS</th>
                            </tr>
                        </thead>
                        <tbody className="bg-accent">
                            {rankings.slice(0, 10).map((ranking, index) => (
                                <tr className="text-accent-foreground" key={index}>
                                    <td className="px-4 py-3 border">
                                        <div className="flex items-center text-sm">
                                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                <img
                                                    className="object-cover w-full h-full rounded-full"
                                                    src={ranking?.team_logo}
                                                    alt=""
                                                    loading="lazy"
                                                />
                                                <div
                                                    className="absolute inset-0 rounded-full shadow-inner"
                                                    aria-hidden="true"
                                                ></div>
                                            </div>
                                            <div>
                                                <p className="font-semibold tracking-wide">
                                                    {ranking?.team_name}
                                                </p>
                                                <p className="text-xs text-gray-600">{region}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-ms font-semibold border">
                                        {ranking?.team_rank}
                                    </td>
                                    <td className="px-4 py-3 text-xs border">
                                        <span className="px-2 py-1 text-[17px]">
                                            {ranking?.rating_score}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm border">
                                        {ranking?.total_winnings}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Ranking

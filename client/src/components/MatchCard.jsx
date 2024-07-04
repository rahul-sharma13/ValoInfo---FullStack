import React, { useState } from 'react';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const MatchCard = ({ match }) => {
    // const [savedMatch, setSavedMatch] = useState(false);

    return (
        <div className="flex flex-row relative" >
            <div
                className={`mx-auto bg-accent mt-8 flex min-w-[1000px] items-center h-20 rounded-2xl shadow-lg hover:-translate-y-2 transform transition-all duration-300`}
            >
                {/* first */}
                <div className="ml-5 text-[13px] font-normal flex justify-center items-center gap-2">
                    <img src={match?.league?.icon} className='h-10 object-contain' />
                    {match?.league?.name}
                </div>
                <div className="flex gap-3 text-[16px] mx-auto">
                    {/* team name & scores */}
                    <div>
                        {match.match?.teams[0]?.name}
                    </div>
                    <div className="flex">
                        <div className={`${match.match?.teams[0]?.has_won ? "text-green-600" : "text-red-600"}`}>{match.match?.teams[0].game_wins}</div>
                        <div>&nbsp;:&nbsp;</div>
                        <div className={`${match.match?.teams[1]?.has_won ? "text-green-600" : "text-red-600"}`}>{match.match?.teams[1].game_wins}</div>
                    </div>
                    <div>{match.match?.teams[1].name}</div>
                </div>

                {/* third */}
                <div className="mr-5 text-[13px] uppercase">{match?.state} <span className='text-gray-400'>| {match?.date.slice(0, 10)} </span></div>
            </div>
            {/* <div >
                {savedMatch ? (<AiFillStar className="absolute top-16 cursor-pointer left-48" />) : (<AiOutlineStar className="absolute top-16 cursor-pointer left-48" />)}
            </div> */}
        </div>
    )
}

export default MatchCard
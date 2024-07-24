import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropright } from 'react-icons/io';

const MatchCard = ({ match }) => {

    return (
        <div className="flex flex-row relative" >
            <div
                className={`mx-auto bg-accent mt-8 flex min-w-[1000px] items-center h-20 rounded-2xl shadow-lg hover:-translate-y-2 transform transition-all duration-300 px-3`}
            >
                {/* time */}
                <div className='flex items-center h-full w-[10%]'>
                    <span className='text-xs text-gray-400'>
                        {match?.date.slice(0, 10)}
                    </span>
                </div>
                {/* team up and down */}
                <div className='flex flex-col h-full justify-center items-start w-[20%] gap-2'>
                    <div className='flex items-center gap-1'>
                        {
                            match?.match?.teams[0]?.has_won ? (<IoMdArrowDropright className='text-green-600 absolute left-[90px]' size={20} />) : ""
                        }
                        <img src={match?.match?.teams[0]?.icon} className='h-6 w-6 object-contain' />
                        <div className='text-[15px] font-normal'>
                            {match?.match?.teams[0]?.name}
                        </div>
                    </div>
                    <div className='flex items-center gap-1'>
                        <img src={match?.match?.teams[1]?.icon} className='h-6 w-6 object-contain' />
                        <div className='text-[15px] font-normal'>
                            {match?.match?.teams[1]?.name}
                        </div>
                    </div>
                </div>
                {/* scores */}
                <div className='flex flex-col h-full justify-center items-center w-[20%]'>
                    <div className='text-[14px] font-semibold underline'>
                        {match?.match?.teams[0]?.game_wins}
                    </div>
                    <div className='text-[14px] font-semibold underline'>
                        {match?.match?.teams[1]?.game_wins}
                    </div>
                </div>
                {/* state */}
                <div className='flex items-center gap-2 h-full w-[20%]'>
                    <span className='text-[14px] font-semibold'>
                        {match?.state === 'completed' ? 'Completed' :
                            match?.state === 'in_progress' ? 'Live' :
                                match?.state === 'unstarted' ? 'Upcoming' : ""
                        }
                    </span>
                    <span className='text-[10px] bg-card p-2 rounded-md'>
                        {moment(match?.date.slice(0, 10)).fromNow()}
                    </span>
                </div>
                {/* league icon and name */}
                <div className='flex items-center gap-4 h-full w-[35%]'>
                    <div className='flex flex-col items-end w-[20%]'>
                        <span className='text-[11px] text-gray-500'>Vodes:</span>
                        {
                            match?.vod ? (<Link className='hover:underline' to={match?.vod}>Link</Link>) : (<span className='text-gray-500 text-xs'>Pending</span>)
                        }

                    </div>

                    <img src={match?.league?.icon} className='h-10 w-10 object-contain' />
                    <span className='text-[14px] font-semibold'>
                        {match?.league?.name}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MatchCard
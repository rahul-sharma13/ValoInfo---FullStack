import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip'

const HomeMatchCard = ({ match }) => {
    return (
        <TooltipProvider delayDuration={80}>
            <Tooltip>
                <TooltipTrigger>
                    <div className='cursor-pointer hover:scale-105 transition-all animate-in'>
                        <div className='h-20 md:min-w-[240px] md:w-[240px] w-[210px] rounded-xl border bg-card text-card-foreground shadow'>
                            <div className='mt-4 flex items-center'>
                                {/* name and score */}
                                <div className='flex flex-row gap-9 w-[80%]'>
                                    {/* name */}
                                    <div className='flex flex-col items-start gap-1 w-[90%] ml-3'>
                                        <p className='text-[12px]'>
                                            {match.match?.teams[0]?.name}
                                        </p>
                                        <p className='text-[12px]'>
                                            {match.match?.teams[1]?.name}
                                        </p>
                                    </div>

                                    {/* scores */}
                                    <div className='flex flex-col items-end gap-1 w-[10%]'>
                                        <p className='text-sm underline text-gray-500'>{match.match?.teams[0].game_wins}</p>

                                        <p className='text-sm underline text-gray-500'>{match.match?.teams[1].game_wins}</p>
                                    </div>
                                </div>
                                <div className='ml-2'>
                                    <img
                                        src={match?.league?.icon} className='h-8 w-8 md:block hidden'
                                        alt={match?.league?.name}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent className='mb-2'>
                    <div>
                        <h1 className='uppercase'>{match?.state}</h1>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export default HomeMatchCard
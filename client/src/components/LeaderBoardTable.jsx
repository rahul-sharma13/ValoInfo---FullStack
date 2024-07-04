import React from 'react'

const LeaderBoardTable = ({ ranks, act }) => {
    return (
        <div className=" max-w-4xl mx-auto mb-8 overflow-hidden rounded-lg shadow-lg mt-10 font-poppins">
            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="tracking-wide text-left bg-accent text-accent-foreground uppercase border-b border-gray-600">
                            <th className="px-4 py-3">player</th>
                            <th className="px-4 py-3">ranking</th>
                            <th className="px-4 py-3">ranked rating</th>
                            <th className="px-4 py-3">total wins</th>
                        </tr>
                    </thead>
                    <tbody className="bg-accent">
                        {ranks.slice(0, 10).map((rank, index) => (
                            <tr className="text-accent-foreground" key={index}>
                                <td className="px-4 py-3 border">
                                    <div className="flex items-center text-sm">
                                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                            <img
                                                className="object-cover w-full h-full rounded-full"
                                                src="/images/valo_logo2.png"
                                                alt=""
                                                loading="lazy"
                                            />
                                            <div
                                                className="absolute inset-0 rounded-full shadow-inner"
                                                aria-hidden="true"
                                            ></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold tracking-wider cursor-pointer">
                                                {rank?.gameName}<span className='font-light text-gray-400'>#{rank?.tagLine}</span>
                                            </p>
                                            <p className="text-xs text-gray-600 uppercase">{act}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-ms font-semibold border">
                                    {rank?.leaderboardRank}
                                </td>
                                <td className="px-4 py-3 text-xs border">
                                    <span className="px-2 py-1 text-[17px]">
                                        {rank?.rankedRating}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm border">
                                    {rank?.numberOfWins}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LeaderBoardTable
import React, { useState } from 'react';
import axios from 'axios';
import MatchCard from '../components/MatchCard';
import TextShine from '../components/TextShine';
import { Skeleton } from '../components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';

const Matches = () => {
    const url = `https://api.henrikdev.xyz/valorant/v1/esports/schedule?api_key=${import.meta.env.VITE_API_KEY}`;

    const { data, isLoading } = useQuery({
        queryKey: ['matches'],
        queryFn: async () => {
            const res = await axios.get(url);
            return res.data;
        },
        staleTime: 24 * 60 * 60 * 1000,
    });

    //for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data ? data.data.slice(firstIndex, lastIndex) : [];
    const npage = data ? Math.ceil(data.data.length / recordsPerPage) : 0;
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const changePage = (id) => {
        setCurrentPage(id);
    };

    return (
        <section>
            <div className="flex flex-col font-poppins overflow-x-auto w-full md:p-0 p-1">
                <h1 className="mt-10 mx-auto">
                    <TextShine name="Completed Matches"/>
                </h1>

                {
                    isLoading ? (
                        <div className='mx-auto flex flex-col gap-8 mt-8 rounded-2xl'>
                            <Skeleton className="min-w-[1000px] h-20" />
                            <Skeleton className="min-w-[1000px] h-20" />
                            <Skeleton className="min-w-[1000px] h-20" />
                            <Skeleton className="min-w-[1000px] h-20" />
                            <Skeleton className="min-w-[1000px] h-20" />
                            <Skeleton className="min-w-[1000px] h-20" />
                            <Skeleton className="min-w-[1000px] h-20" />
                            <Skeleton className="min-w-[1000px] h-20" />
                            <Skeleton className="min-w-[1000px] h-20" />
                            <Skeleton className="min-w-[1000px] h-20" />
                        </div>
                    ) : (
                        records.length === 0 ? "No matches found" :
                            records.map((match, index) => (
                                <MatchCard match={match} key={index} />
                            ))

                    )
                }
            </div>

            <h2 className="text-center my-4 text-[14px] font-semibold font-poppins text-gray-600">Page - {currentPage} / {npage}</h2>

            {/* Pagination menu */}
            <div className="flex justify-center space-x-1 dark:text-gray-100">
                <button
                    title="previous"
                    type="button"
                    onClick={prePage}
                    className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-accent text-accent-foreground"
                >
                    <svg
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4"
                    >
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                {numbers.map((n, i) => (
                    <button
                        type="button"
                        title="Page 1"
                        onClick={() => changePage(n)}
                        className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md bg-background active:border-violet-600 hover:-translate-y-1 transition-all transform duration-200 text-accent-foreground"
                        key={i}
                    >
                        {n}
                    </button>
                ))}
                <button
                    title="next"
                    type="button"
                    onClick={nextPage}
                    className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-accent text-accent-foreground"
                >
                    <svg
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>

        </section>
    );
}

export default Matches
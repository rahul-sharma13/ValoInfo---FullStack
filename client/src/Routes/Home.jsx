import React, { useEffect, useState } from 'react';
import HomeMatchCard from '../components/HomeMatchCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { Spinner } from '@material-tailwind/react';
import DiscussionTab from '../components/DiscussionTab';
import EventCard from '../components/EventCard';
import ArticleTab from '../components/ArticleTab';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Home = () => {
    const url = `https://api.henrikdev.xyz/valorant/v1/esports/schedule?api_key=${import.meta.env.VITE_API_KEY}`;
    const queryClient = useQueryClient();
    queryClient.refetchQueries({ stale : true });

    // get matches
    const match = useQuery({
        queryKey: ['match'],
        queryFn: async () => {
            const res = await axios.get(url);
            return res.data.data.slice(0, 8);
        },
        retry: 3,
        staleTime: 60 * 1000,
    })

    // get post
    const post = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/post/getAllPosts`);
            return res.data.data;
        },
        retry: 3,
        staleTime: 60 * 1000,
    })

    // get event
    const getEvents = async () => {
        const res = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/event/all`);
        // console.log(res);
        return res.data.data.slice(0, 6);
    }

    const { isLoading, isError, data: event } = useQuery({
        queryKey: ['event'],
        queryFn: getEvents,
        staleTime: 24 * 60 * 60 * 1000,
    });

    // get articles
    const article = useQuery({
        queryKey: ['article'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/article/getAll`);
            return res.data.data;
        },
        retry: 3,
        staleTime: 60 * 1000,
    })

    return (
        <main className='flex flex-col gap-10 mt-4'>
            <div className='md:max-w-screen-xl md:bg-accent mx-auto p-5 w-full'>
                {/* matches */}
                <div className='flex flex-col w-full'>
                    <div className='flex flex-row justify-between md:items-baseline '>
                        <h1 className='text-xl text-accent-foreground mb-2'>Matches</h1>
                        <Link to="/matches" className='dark:text-gray-400 text-gray-700 cursor-pointer flex items-center'>
                            <span className='hover:text-gray-700'>Show more</span>
                            <FaChevronRight className='' size={12} />
                        </Link>
                    </div>
                    <div className='flex xl:gap-4 md:gap-1 flex-wrap gap-2 justify-center'>
                        {
                            match.isLoading ? (<div>
                                <Spinner color="white" size="xl" />
                            </div>) : (
                                match.data ? match.data.map((match, index) => (
                                    <HomeMatchCard match={match} key={index} />
                                )) : "no matches to display"
                            )
                        }
                        {
                            match.error && (
                                <div className=''>
                                    <p className='text-red-700 text-lg'>Try again later</p>
                                </div>
                            )
                        }
                    </div>
                    <p className='text-gray-600 text-sm mt-2 ml-1'>*hover on the card to get more info</p>
                </div>
            </div>

            {/* articles and posts */}
            <div className='max-w-screen-xl bg-accent mx-auto p-5 w-full flex flex-col md:h-96 gap-2 md:flex-row md:items-stretch'>
                {/* left */}
                <div className='bg-card md:w-[60%] min-w-fit'>
                    <div className='flex flex-col pt-2'>
                        <Link to='/articles'>
                            <h1 className='text-lg text-center dark:hover:text-gray-600 cursor-pointer hover:text-gray-700'>
                                Articles
                            </h1>
                        </Link>
                        {/* articles */}
                        <div className='flex flex-col gap-1 mt-1 px-2 h-full md:mb-0 mb-4'>
                            {
                                article.isLoading ? (<div className='flex items-center justify-center'>
                                    <Spinner color="white" size="xl" />
                                </div>) :
                                    article.data ?
                                        (article?.data.slice(article.data.length - 5, article.data.length).reverse().map((article, index) => (
                                            <ArticleTab
                                                article={article}
                                                index={index}
                                                key={article._id}
                                            />)
                                        )) : "no articles to display"
                            }
                            {
                                article.isError && <p className='text-red-700 text-lg'>Can't display articles</p>
                            }
                        </div>
                    </div>
                </div>

                {/* right */}
                <div className='bg-card md:w-[40%] min-w-fit rounded-md md:p-0 p-4'>
                    <div className='flex flex-col pt-2'>
                        <Link to='/discussion'>
                            <h1 className='text-lg text-center dark:hover:text-gray-600 cursor-pointer hover:text-gray-700'>Discussions</h1>
                        </Link>
                        {/* posts */}
                        <div className='flex flex-col gap-1 mt-1'>
                            {
                                post.isLoading ? (<div className='flex items-center justify-center'>
                                    <Spinner color="white" size="xl" />
                                </div>) :
                                    post.data ?
                                        post.data.slice(0,7).map((post, index) => (
                                            <DiscussionTab
                                                post={post}
                                                index={index}
                                                key={post._id}
                                            />
                                        )) : "no posts to display"
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* events */}
            <div className='max-w-screen-xl bg-card mx-auto p-5 w-full'>
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <h1 className='text-3xl cursor-pointer'>
                            Events
                        </h1>
                        <Link to="/events" className='flex items-center gap-1 hover:text-gray-600'>
                            <span>Show all</span>
                            <FaChevronRight className='dark:text-gray-400 text-gray-700 cursor-pointer flex items-center hover:scale-110 transition-all duration-75' size={12} />
                        </Link>
                    </div>

                    {/* events */}
                    {
                        isLoading ? (<div className='flex items-center justify-center h-full'>
                            <Spinner color="white" size="xl" />
                        </div>) : (
                            <div className="flex flex-wrap mt-8 justify-center sm:gap-4">
                                {
                                    event ? (<EventCard
                                        events={event}
                                        loading={isLoading}
                                    />) : "no events to display"
                                }
                            </div>
                        )
                    }
                    {
                        isError && <p className='text-red-700 text-lg'>Cant display events</p>
                    }
                </div>
            </div>
        </main>
    )
}

export default Home
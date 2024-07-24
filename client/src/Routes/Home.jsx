import React, { useEffect, useState } from 'react';
import HomeMatchCard from '../components/HomeMatchCard';
import axios from 'axios';
import { Link, useFetcher } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { Spinner } from '@material-tailwind/react';
import DiscussionTab from '../components/DiscussionTab';
import EventCard from '../components/EventCard';
import ArticleTab from '../components/ArticleTab';

const Home = () => {
    const url = `https://api.henrikdev.xyz/valorant/v1/esports/schedule?api_key=${import.meta.env.VITE_API_KEY}`;
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);
    const [articles, setArticles] = useState([]);

    // get matches
    useEffect(() => {
        const getMatches = async () => {
            setLoading(true);
            try {
                await axios.get(url).then((response) => {
                    // console.log(response.data.data.reverse())
                    setLoading(false);
                    setMatches(response.data.data.slice(0, 8));
                }).catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

        getMatches();
    }, [])

    // get posts
    useEffect(() => {
        const getPosts = async () => {
            try {
                await axios.get("/api/v1/post/getAllPosts").then((res) => {
                    setPosts(res.data.data.slice(0, 7));
                }).catch((err) => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        }

        getPosts();
    }, [])

    // get events
    useEffect(() => {
        const getEvents = async () => {
            try {
                await axios.get("/api/v1/event/all").then((res) => {
                    // console.log(res);
                    setEvents(res.data.data.slice(0, 6));
                }).catch((err) => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        }

        getEvents();
    }, [])

    useEffect(() => {
        const getArticles = async () => {
            try {
                await axios.get("/api/v1/article/getAll").then((res) => {
                    console.log(res);
                    setArticles(res.data.data.slice(0, 6));
                }).catch((err) => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        }

        getArticles();
    },[])

    return (
        <main className='flex flex-col gap-10'>
            <div className='md:max-w-screen-xl md:bg-accent mx-auto p-5 w-full'>
                {/* matches */}
                <div className='flex flex-col w-full'>
                    <div className='flex flex-row justify-between items-baseline'>
                        <h1 className='text-xl text-accent-foreground mb-2'>Matches</h1>
                        <Link to="/matches" className='dark:text-gray-400 text-gray-700 cursor-pointer flex items-center hover:scale-110 transition-all duration-75'>
                            <span>Show more</span>
                            <FaChevronRight className='' size={12} />
                        </Link>
                    </div>
                    <div className='flex xl:gap-4 md:gap-1 flex-wrap gap-2 justify-center'>
                        {
                            loading ? (<div>
                                <Spinner color="white" size="xl" />
                            </div>) : (
                                matches.map((match, index) => (
                                    <HomeMatchCard match={match} key={index} />
                                )))
                        }
                    </div>
                    <p className='text-gray-600 text-sm mt-2 ml-1'>*hover on the card to get more info</p>
                </div>
            </div>

            <div className='max-w-screen-xl bg-accent mx-auto p-5 w-full flex flex-row h-96 gap-2'>
                {/* left */}
                <div className='bg-card w-[60%]'>
                    <div className='flex flex-col pt-2'>
                        <Link to='/articles'>
                            <h1 className='text-lg text-center dark:hover:text-gray-600 cursor-pointer hover:text-gray-700'>
                                Articles
                            </h1>
                        </Link>
                        {/* posts */}
                        <div className='flex flex-col gap-1 mt-1 px-2'>
                            {
                                articles.map((article, index) => (
                                    <ArticleTab
                                        article={article}
                                        index={index}
                                        key={article._id}
                                    />
                                ))
                            }
                        </div>  
                    </div>
                </div>

                {/* right */}
                <div className='bg-card w-[40%]'>
                    <div className='flex flex-col pt-2'>
                        <Link to='/discussion'>
                            <h1 className='text-lg text-center dark:hover:text-gray-600 cursor-pointer hover:text-gray-700'>Discussions</h1>
                        </Link>
                        {/* posts */}
                        <div className='flex flex-col gap-1 mt-1'>
                            {
                                posts.map((post, index) => (
                                    <DiscussionTab
                                        post={post}
                                        index={index}
                                        key={post._id}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
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
                    <div className="flex flex-wrap mt-8 justify-center sm:gap-4">

                        <EventCard
                            events={events}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home
import React, { useEffect, useState } from 'react';
import HomeMatchCard from '../components/HomeMatchCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { Spinner } from '@material-tailwind/react';

const Home = () => {
    const url = `https://api.henrikdev.xyz/valorant/v1/esports/schedule?api_key=${import.meta.env.VITE_API_KEY}`;
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <main className='flex flex-col gap-10'>
            <div className='md:max-w-screen-xl md:bg-accent mx-auto p-5'>
                {/* matches */}
                <div className='flex flex-col'>
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
                                <Spinner color="cyan" size="xl" />
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
                <div className='bg-card w-[65%]'>
                    <div className='flex flex-col pt-2'>
                        <Link to='/announcement'>
                            <h1 className='text-lg text-center dark:hover:text-gray-600 cursor-pointer hover:text-gray-700'>
                                Announcements
                            </h1>
                        </Link>
                        {/* posts */}
                        <div>

                        </div>
                    </div>
                </div>
                
                {/* right */}
                <div className='bg-card w-[35%]'>
                    <div className='flex flex-col pt-2'>
                        <Link to='/discussion'>
                            <h1 className='text-lg text-center dark:hover:text-gray-600 cursor-pointer hover:text-gray-700'>Discussions</h1>
                        </Link>
                        {/* posts */}
                        <div>

                        </div>
                    </div>
                </div>
            </div>
                <div className='bg-card w-[30%]'>
                    <div className='flex flex-col pt-2'>
                        <h1 className='text-lg text-center dark:hover:text-gray-600 cursor-pointer hover:text-gray-700'>
                            Events
                        </h1>
                        {/* events */}
                        <div>

                        </div>
                    </div>
                </div>
        </main>
    )
}

export default Home
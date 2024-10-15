import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select'
import { Button, Spinner, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import axios from 'axios'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@/lib/hooks'

const Discussions = () => {
    const navigate = useNavigate();
    const [inTime, setInTime] = useState('all');
    const [order, setOrder] = useState('dsc');
    const [searchTerm, setSearchTerm] = useState('');
    const { currentUser } = useSelector(state => state.user);
    const [topic, setTopic] = useState('');
    const location = useLocation();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // set the topic from url
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const topicFromUrl = urlParams.get('topic');
        location.search === '' && setTopic('');
        if (topicFromUrl) {
            setTopic(topicFromUrl);
        } else {
            setTopic(''); // Reset the topic when the location goes back to default
        }
    }, [location.search])

    const { data: postOnTopic, isLoading: onTopicLoad, isError: topicError } = useQuery({
        queryKey: ['postOnTopic', topic, location.search],
        queryFn: async () => {
            if (topic !== '') {
                const res = await axios.get(`https://valo-info-api.vercel.app/api/v1/post/getPosts?topic=${topic}`);
                return res.data;
            }
            return [];
        }
    })

    const handleOrder = (value) => {
        setOrder(value);
    }

    const handleTime = (value) => {
        setInTime(value);
    }

    // post with required order or timings
    const { data: posts, isLoading: postsLoad, isError: postsError } = useQuery({
        queryKey: ['posts', inTime, order],
        queryFn: async () => {
            const res = await axios.get(`https://valo-info-api.vercel.app/api/v1/post/getAllPosts?inTime=${inTime}&order=${order}`);
            return res.data;
        }
    })

    const { data: searchedPosts, isLoading: searchedLoading, isError: searchedError } = useQuery({
        queryKey: ['searchPosts', debouncedSearchTerm],
        queryFn: async () => {
            const res = await axios.get(`https://valo-info-api.vercel.app/api/v1/post/getPosts?searchTerm=${debouncedSearchTerm}`);
            return res.data;
        },
        enabled: !!debouncedSearchTerm
    })

    return (
        <section className='max-w-5xl mx-auto mt-5 p-2'>
            <div className='flex mb-4 md:flex-row flex-col md:gap-0 gap-4 justify-between'>
                {/* left */}
                <div className='flex flex-row items-center gap-2'>
                    <Typography className='text-sm'>Sort By:</Typography>
                    <Select onValueChange={handleOrder}>
                        <SelectTrigger className='w-[140px]'>
                            <SelectValue placeholder='Sort' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sort</SelectLabel>
                                <SelectItem value='dsc'>Newest</SelectItem>
                                <SelectItem value='asc'>Oldest</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Typography className='text-sm'>From:</Typography>
                    <Select onValueChange={handleTime}>
                        <SelectTrigger className='w-[140px]'>
                            <SelectValue placeholder='All Time' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value='day'>1 day</SelectItem>
                                <SelectItem value='week'>1 week</SelectItem>
                                <SelectItem value='month'>1 month</SelectItem>
                                <SelectItem value='all'>All Time</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* right */}
                <div className='flex items-center gap-2'>
                    <Input
                        type='text'
                        placeholder='Search'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='flex-1'
                    />
                    {
                        currentUser && (
                            <Button variant='outlined' className='py-[10px]' color='cyan' size='sm' onClick={() => navigate('/create-post')}>
                                Create Post
                            </Button>
                        )
                    }
                </div>
            </div>

            {/* list of posts */}
            <div className={`bg-accent h-full flex flex-col ${posts && posts.data.length === 0 && " justify-center items-center"}`}>
                {
                    debouncedSearchTerm ? (searchedLoading ? (<div className='flex justify-center items-center h-[50vh]'>
                        <Spinner />
                    </div>) : (
                        searchedPosts && searchedPosts.data.posts.length === 0 ? (<div className='flex items-center justify-center bg-accent h-[50vh]'>No posts to show!</div>) : searchedPosts.data.posts.map((post, index) => (
                            <div className={`${index !== searchedPosts.data.posts.length - 1 ? "border-b p-3 border-gray-500" : "p-3"}`} key={index}>
                                <PostCard
                                    post={post}
                                    author={post?.author}
                                />
                            </div>
                        )
                        )
                    )) :
                        topic ? (onTopicLoad ? (<div className='flex justify-center items-center h-[50vh]'>
                            <Typography>Loading...</Typography>
                        </div>) : (
                            postOnTopic && postOnTopic.data.posts.length === 0 ?
                                (<p>No posts to show based on this topic!</p>)
                                :
                                postOnTopic.data.posts.map((post, index) => (
                                    <div className={`${index !== postOnTopic.data.posts.length - 1 ? "border-b p-3 border-gray-500" : "p-3"}`} key={index}>
                                        <PostCard
                                            post={post}
                                            author={post?.author}
                                        />
                                    </div>
                                ))

                        )) : (
                            postsLoad ? (<div className='flex justify-center items-center h-[50vh]'>
                                <Spinner />
                            </div>) : (
                                posts && posts.data.length === 0 ? (<div className='flex items-center justify-center bg-accent h-[50vh]'>No posts to show!</div>) :
                                    posts.data.map((post, index) => (
                                        <div className={`${index !== posts.data.length - 1 ? "border-b p-3 border-gray-500" : "p-3"}`} key={index}>
                                            <PostCard
                                                post={post}
                                                author={post?.author}
                                            />
                                        </div>
                                    ))
                            )
                        )
                }
                {
                    searchedError || postsError || topicError && (<p className='text-red-700 text-lg'>Something went wrong while fetching!</p>)
                }
            </div>
        </section>
    )
}

export default Discussions
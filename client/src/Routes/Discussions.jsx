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
import { Button, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import axios from 'axios'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'

const Discussions = () => {
  const navigate = useNavigate();
  const [inTime, setInTime] = useState('all');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState('dsc');
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const getAllPosts = async () => {
      setLoading(true);
      try {
        await axios.get(`/api/v1/post/getAllPosts?inTime=${inTime}`).then((res) => {
          // console.log(res);
          setLoading(false);
          setPosts(res?.data?.data);
        }).catch((error) => {
          setError(error?.response?.data?.message);
          setLoading(false);
        })
      } catch (error) {
        setError("Something went wrong");
        setLoading(false);
      }
    }

    getAllPosts();
  }, [])

  const handleOrder = (value) => {
    setOrder(value);
  }

  const handleTime = (value) => {
    setInTime(value);
  }

  // post with required order or timings
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        await axios.get(`http://localhost:8000/api/v1/post/getAllPosts?inTime=${inTime}&order=${order}`).then((res) => {
          setLoading(false);
          setPosts(res?.data?.data);
        }).catch((error) => {
          setError(error?.response?.data?.message);
          setLoading(false);
        })
      } catch (error) {
        setError("Something went wrong");
        setLoading(false);
      }
    }

    getPosts();
  }, [inTime, order])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const getSearchedPosts = async () => {
        await axios.get(`http://localhost:8000/api/v1/post/getPosts?searchTerm=${searchTerm}`).then((res) => {
          setLoading(false);
          // console.log(res);
          setPosts(res?.data?.data?.posts);
          setSearchTerm('');
        }).catch((error) => {
          setError(error?.response?.data?.message);
          setLoading(false);
        })
      }

      if (searchTerm) {
        getSearchedPosts();
      }
    }
  }

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
          <Input type='text' placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} />
          {
            currentUser && (
              <Button variant='outlined' className='py-[10px]' color='cyan' size='sm' onClick={() => navigate('/create-post')}>
                Create Post
              </Button>
            )
          }
        </div>
      </div>

      {
        loading ? (
          <div className='flex justify-center items-center h-[50vh]'>
            <Typography color='gray'>Loading...</Typography>
          </div>
        ) : (
          <div className='bg-accent h-screen'>
            {
              posts.map((post, index) => (
                <div className='border-b p-3 border-gray-500' key={index}>
                  <PostCard
                    post={post}
                    author={post?.author}
                  />
                </div>
              ))
            }
          </div>
        )
      }

      {
        error && (
          <div className='flex justify-center items-center h-[50vh]'>
            <Typography color='red'>{error}</Typography>
          </div>
        )
      }
    </section>
  )
}

export default Discussions
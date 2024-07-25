import React, { useEffect, useState } from 'react'
import { Button, Spinner, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ArticleCard from '../components/ArticleCard'

const Articles = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useSelector(state => state.user);

  // post with required order or timings
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        await axios.get(`https://valo-info-api.vercel.app/api/v1/article/getAll`).then((res) => {
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
  }, [])

  // search post
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const getSearchedPosts = async () => {
        await axios.get(`https://valo-info-api.vercel.app/api/v1/article/getAll?searchTerm=${searchTerm}`).then((res) => {
          setLoading(false);
          // console.log(res);
          setPosts(res.data?.data);
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
      <div className='flex mb-4 md:flex-row flex-col md:gap-0 gap-4 justify-center'>
        {/* right */}
        <div className='flex items-center gap-2'>
          <Input 
            type='text' 
            placeholder='Search' 
            className='' 
            onChange={(e) => setSearchTerm(e.target.value)} 
            onKeyPress = {handleKeyPress}
          />
          {
            currentUser && currentUser.isAdmin && (
              <Button variant='outlined' className='' color='cyan' size='sm' onClick={() => navigate('/create-article')}>
                Create Article
              </Button>
            )
          }
        </div>
      </div>

      {
        loading ? (
          <div className='flex justify-center items-center h-[50vh]'>
            <Spinner color='white' size='lg'/>
          </div>
        ) : (
          <div className='bg-accent h-screen'>
            {
              posts.map((post, index) => (
                <div className='border-b p-3 border-gray-500' key={index}>
                  <ArticleCard 
                    article={post}
                    index={index}
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

export default Articles
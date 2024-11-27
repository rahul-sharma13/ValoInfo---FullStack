import React, { useEffect, useState } from 'react'
import { Button, Spinner, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ArticleCard from '../components/ArticleCard'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@/lib/hooks'

const Articles = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { currentUser } = useSelector(state => state.user);

    const { data: posts, isPending, isError } = useQuery({
        queryKey: ['article'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/article/getAll`);
            return res.data.data;
        }
    })

    // search post
    const { data: searchedArticles, isLoading: searchedLoading, isError: searchedError } = useQuery({
        queryKey: ['searchPosts', debouncedSearchTerm],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/article/getAll?searchTerm=${searchTerm}`);
            return res.data;
        },
        enabled: !!debouncedSearchTerm
    })

    return (
        <section className='max-w-5xl mx-auto mt-5 p-2'>
            <div className='flex mb-4 md:flex-row flex-col md:gap-0 gap-4 justify-center'>
                {/* right */}
                <div className='flex items-center gap-2 w-full'>
                    <Input
                        type='text'
                        placeholder='Search by the title of the article'
                        className='w-[80%]'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {
                        currentUser && currentUser.isAdmin && (
                            <Button variant='outlined' className='w-[20%] min-h-full' color='cyan' size='sm' onClick={() => navigate('/create-article')}>
                                Create Article
                            </Button>
                        )
                    }
                </div>
            </div>

            {
                debouncedSearchTerm ? (
                    searchedLoading ? (
                        <div className='flex justify-center items-center h-[50vh]'>
                            <Spinner color='white' size='lg' />
                        </div>
                    ) : (
                        <div className='bg-accent h-screen'>
                            {
                                searchedArticles && searchedArticles.data.length == 0 ? <p className='flex justify-center items-center h-[50vh] text-accent-foreground'>No posts found</p> : searchedArticles.data.map((post, index) => (
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
                )
                    :
                    isPending ? (
                        <div className='flex justify-center items-center h-[50vh]'>
                            <Spinner color='white' size='lg' />
                        </div>
                    ) : (
                        <div className='bg-accent h-screen'>
                            {
                                posts && posts.map((post, index) => (
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
                isError && (
                    <div className='flex justify-center items-center h-[50vh]'>
                        <Typography color='red'>Something went wrong!</Typography>
                    </div>
                )
            }
        </section>
    )
}

export default Articles

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Spinner } from '@material-tailwind/react'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import CommentSection from '../components/CommentSection'

const PostPage = () => {
    const { slug } = useParams();
    //console.log(slug);
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(false);
    const [author, setAuthor] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                await axios.get(`http://localhost:8000/api/v1/post/getposts?slug=${slug}`).then((res) => {
                    // console.log(res.data.data.posts[0]);
                    setPost(res.data.data.posts[0]);
                    setAuthor(res.data.data.posts[0].author);
                    setLoading(false);
                }).catch((err) => {
                    // console.log(err);
                    setLoading(false);
                    setError(true);
                });
            } catch (error) {
                // console.log(error);
                setLoading(false);
            }
        }

        fetchPost();
    }, [slug])


    useEffect(() => {
        const getAuthor = async () => {
            try {
                setLoading(true);
                await axios.get(`http://localhost:8000/api/v1/user/getuser/${author}`).then((res) => {
                    // console.log(res.data.data);
                    setUserDetails(res.data.data);
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                    setError(true);
                });
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        if (post && post.author) {
            getAuthor();
        }
    }, [author, post])


    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner />
            </div>
        )
    }
    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            {/* title div */}
            <div className='flex flex-col gap-3 cursor-pointer'>
                <div className='flex flex-row items-center gap-2'>
                    {/* avatar */}
                    <Link to={`/user/${userDetails?.username}`}>
                        <img src={userDetails?.avatar} alt='avatar' className='w-12 h-12 rounded-full' />
                    </Link>

                    {/* details */}
                    <div className='flex flex-col'>
                        <h1 className='text-sm dark:text-white/60 text-bold text-black'>
                            <span className='uppercase'> {userDetails?.username} </span>
                        </h1>
                        <p className='text-sm dark:text-white/60 text-black'>
                            <span className='text-md'> {new Date(post.updatedAt).toLocaleDateString()} </span>
                        </p>
                    </div>
                </div>
                <div className='flex flex-row-reverse p-3 items-center justify-end max-w-xl bg-accent rounded-lg h-28'>
                    <div className='p-5 flex flex-col'>
                        <h1 className='text-xl text-left lg:text-3xl'> {post && post.title} </h1>
                        <div>
                            <span className='text-[12px]'>posted in </span>
                            <span className='cursor-pointer hover:underline text-cyan-300'>{post && post.topic} </span>
                        </div>
                    </div>

                    <div className='cursor-pointer flex flex-col items-center justify-center'>
                        <BiUpvote size={15} />
                        <span className='text-sm'>10</span>
                        <BiDownvote size={15} />
                    </div>
                </div>

                <div className='bg-accent max-h-70 rounded-lg p-3 post-content' dangerouslySetInnerHTML={{ __html: post && post.content }}>

                </div>
            </div>

            {/* comments div */}
            <CommentSection postId={post._id}/>
        </main>
    )
}

export default PostPage
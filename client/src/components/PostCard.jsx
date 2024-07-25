import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSolidUpArrow } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PostCard = ({ post, author }) => {
    const [userDetails, setUserDetails] = useState(null);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const getUser = async () => {
            try {
                await axios.get(`https://valo-info-api.vercel.app/api/v1/user/getuser/${author}`).then((res) => {
                    // console.log(res.data.data);
                    setUserDetails(res.data.data);
                }).catch((err) => {
                    console.log(err);
                });
            } catch (error) {
                console.log(error);
            }
        }

        if (post && post.author) {
            getUser();
        }
    }, [post])

    return (
        <div className='flex gap-3'>
            {/* votes */}
            <div className='flex flex-col items-center'>
                <button>
                    {currentUser &&
                        post.upvotes.includes(currentUser._id) ?
                        (<BiSolidUpArrow className='text-cyan-500' />) : (<BiSolidUpArrow className='cursor-pointer hover:text-cyan-500' />)
                    }
                </button>
                <p>{post?.noOfUpvotes}</p>
            </div>

            {/* post details */}
            <div className='flex flex-col'>
                <div className='flex gap-1 items-baseline'>
                    <Link to={`/post/${post?.slug}`} className='cursor-pointer'>
                        <h1 className='hover:underline text-lg'>{post?.title}</h1>
                    </Link>
                    <span className='text-sm text-gray-400'>in</span>
                    <Link to={`/discussion?topic=${post?.topic}`}>
                        <p className='cursor-pointer hover:underline text-cyan-300 text-sm font-thin'>{post?.topic}</p>
                    </Link>
                </div>

                <div className='flex gap-1 text-sm text-gray-400'>
                    <span>posted</span>
                    <span className=''>{moment(post?.createdAt).fromNow()}</span>
                    <div className='h-full w-[1.5px] bg-gray-500' />
                    <span>by</span>
                    <Link to={`/user/${userDetails?.username}`} className='hover:underline text-cyan-400'>
                        <span>{userDetails?.username}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard
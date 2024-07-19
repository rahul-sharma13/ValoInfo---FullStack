import axios from 'axios';
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { BiUpvote } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { BiSolidUpvote } from 'react-icons/bi'

const CommentCard = ({ comment, onLike }) => {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector(state => state.user);

    // console.log(comment);
    useEffect(() => {
        const getUser = async () => {
            try {
                await axios.get(`http://localhost:8000/api/v1/user/getUser/${comment.userId}`).then((res) => {
                    // console.log(res.data.data);
                    setUser(res.data.data);
                }).catch((err) => {
                    console.log(err);
                });
            } catch (error) {
                console.log(error);
            }
        }

        getUser();
    }, [comment._id])

    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img className='h-10 w-10 rounded-full bg-200' src={user?.avatar} alt={user?.username} />
            </div>

            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user?.username}` : 'deleted'}</span>
                    <span className='text-gray-500 text-xs'>
                        {moment(comment?.createdAt).fromNow()}
                    </span>
                </div>
                <p className='text-gray-500 pb-2'>{comment?.content}</p>
                <div className='flex items-center pt-2 text-sm border-t dark:border-gray-700 max-w-fit gap-2'>
                    <button
                        className="text-gray-400 hover:text-cyan-500"
                        onClick={() => onLike(comment._id)} >
                        {currentUser && comment.likes.includes(currentUser._id) ? (<BiSolidUpvote className='text-sm text-cyan-500'/>) : (<BiUpvote className='text-sm' />)} 
                    </button>
                    <p className='text-gray-500'>
                        {
                            comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes > 1 ? 'likes' : 'like')
                        }
                    </p>
                </div>
            </div>
        </div >
    )
}

export default CommentCard
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import moment from 'moment'

const CommentCard = ({ comment }) => {
    const [user, setUser] = useState({});

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
            </div>
        </div>
    )
}

export default CommentCard
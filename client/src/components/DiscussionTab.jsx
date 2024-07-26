import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const DiscussionTab = ({ post, index }) => {
    const [comments, setComments] = useState(0);

    useEffect(() => {
        const getPostComments = async () => {
            try {
                await axios.get(`http://localhost:8000/api/v1/comment/getPostComments/${post._id}`).then((res) => {
                    setComments(res.data.data.length);
                }).catch((err) => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        }

        getPostComments();
    }, [post])

    return (
        <div className={`bg-card border-b border-gray-600 p-2 max-w-full ${index === 0 ? "border-t" : ""}`}>
            <div className='flex justify-between'>
                {/* title */}
                <Link to={`/post/${post?.slug}`}>
                    <h1 className='text-[13px] text-accent-foreground truncate hover:underline'>{post.title}</h1>
                </Link>
                {/* comment number */}
                <p className='text-[11px] text-gray-500'>{comments}</p>
            </div>
        </div>
    )
}

export default DiscussionTab
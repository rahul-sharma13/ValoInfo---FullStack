import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Textarea } from './ui/textarea';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import CommentCard from './CommentCard';

const CommentSection = ({ postId }) => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);

    // comment submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }

        try {
            setLoading(true);
            await axios.post('http://localhost:8000/api/v1/comment/post', { content: comment, postId, userId: currentUser._id }, { withCredentials: true, credentials: 'include' }).then((res) => {
                // console.log(res);
                setComments([res.data.data, ...comments]);
                setLoading(false);
                setComment('');
            }).catch((err) => {
                setLoading(false);
                setError(err.response.data.message);
            });
        } catch (error) {
            setError(error.message);
        }
    }

    // fetch comments
    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                await axios.get(`http://localhost:8000/api/v1/comment/getPostComments/${postId}`).then((res) => {
                    setComments(res.data.data);
                }).catch((err) => {
                    setLoading(false);
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        }

        fetchComments();
    }, [postId]);

    // handling likes
    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/signin');
                return;
            }

            await axios.put(`http://localhost:8000/api/v1/comment/likeComment/${commentId}`, { userId: currentUser._id }, { withCredentials: true, credentials: 'include' }).then((res) => {
                console.log(res);
                setComments(comments.map((comment) =>
                    comment._id === commentId ? {
                        ...comment,
                        likes: res.data.data.likes,
                        numberOfLikes: res.data.data.likes.length
                    } : comment
                ));
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {
                currentUser ?
                    (
                        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                            <p>Signed in as:</p>
                            <img src={currentUser.avatar} alt='avatar' className='w-5 h-5 rounded-full object-cover' />
                            <Link to={'/account'} className='text-xs text-cyan-500 hover:underline'>
                                @{currentUser.username}
                            </Link>
                        </div>
                    ) :
                    (
                        <div className='text-sm text-teal-500 my-5 flex gap-1'>
                            You must be signed in to comment
                            <Link className='text-blue-500 hover:underline' to={'/signin'}>
                                Sign In
                            </Link>
                        </div>
                    )
            }

            {currentUser && (
                <form className='border rounded-md p-3' onSubmit={handleSubmit}>
                    <Textarea
                        placeholder='Add a comment'
                        rows='3'
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                        <Button type='submit' variant='outlined' color='cyan' ripple={true}>
                            Comment
                        </Button>
                    </div>
                </form>
            )}
            {
                error && <p className='text-red-500 text-sm mt-3'>{error}</p>
            }
            {
                comments.length === 0 ? (
                    <p className='text-sm my-5'>No comments yet!</p>
                ) : (
                    <>
                        <div className='text-sm my-5 flex items-center gap-1'>
                            <p>Comments</p>
                            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                                <p>{comments.length}</p>
                            </div>
                        </div>

                        {
                            comments.map((comment) => {
                                return <CommentCard
                                    key={comment._id}
                                    comment={comment}
                                    onLike={handleLike}
                                />
                            })
                        }
                    </>
                )
            }
        </div>
    )
}

export default CommentSection
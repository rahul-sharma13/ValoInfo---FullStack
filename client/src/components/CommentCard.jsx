import axios from 'axios';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { BiUpvote } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { BiSolidUpvote } from 'react-icons/bi';
import { Textarea } from './ui/textarea';
import { Button } from '@material-tailwind/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Link } from 'react-router-dom';

const CommentCard = ({ comment, onLike, onEdit, onDelete }) => {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector(state => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.content);
    // console.log(comment);
    useEffect(() => {
        const getUser = async () => {
            try {
                await axios.get(`https://valoinfo-fullstack.onrender.com/api/v1/user/getUser/${comment.userId}`).then((res) => {
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

    // to edit
    const handleEditComment = async () => {
        setIsEditing(true);
        setEditedComment(comment.content);
    }

    // to save
    const handleSave = async () => {
        try {
            await axios.put(`https://valoinfo-fullstack.onrender.com/api/v1/comment/editComment/${comment._id}`, { content: editedComment }, { withCredentials: true, credentials: 'include' }).then((res) => {
                setIsEditing(false);
                onEdit(comment, editedComment);
                // console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img className='h-10 w-10 rounded-full bg-200' src={user?.avatar} alt={user?.username} />
            </div>

            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <Link to={`/user/${user?.username}`}>
                        <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user?.username}` : 'deleted'}</span>
                    </Link>
                    <span className='text-gray-500 text-xs'>
                        {moment(comment?.createdAt).fromNow()}
                    </span>
                </div>
                {isEditing ? (
                    <>
                        <Textarea
                            value={editedComment}
                            placeholder='Edit comment...'
                            onChange={(e) => setEditedComment(e.target.value)}
                            className='mb-2'
                        />
                        <div className='flex justify-end gap-1'>
                            <Button
                                type='button'
                                variant='outlined'
                                color='cyan'
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                            <Button
                                type='button'
                                variant='text'
                                color='cyan'
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='text-gray-500 pb-2'>{comment?.content}</p>
                        <div className='flex items-center text-sm border-t dark:border-gray-700 max-w-fit gap-1 pt-2'>
                            <button
                                className="text-gray-400 hover:text-cyan-500"
                                onClick={() => onLike(comment._id)} >
                                {currentUser && comment.likes.includes(currentUser._id) ? (<BiSolidUpvote className='text-sm text-cyan-500' size={13} />) : (<BiUpvote className='text-sm' size={13} />)}
                            </button>

                            <div className='flex items-center gap-3'>
                                <p className='text-gray-500'>
                                    {
                                        comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes > 1 ? 'likes' : 'like')
                                    }
                                </p>
                                {
                                    currentUser && currentUser._id === comment.userId.toString() && (
                                        <>
                                            <button
                                                className='text-gray-500 hover:text-cyan-500 text-sm'
                                                onClick={handleEditComment}
                                            >
                                                Edit
                                            </button>
                                            <Dialog>
                                                <DialogTrigger className='text-gray-500 hover:text-red-500 text-sm'>Delete</DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Are you sure?</DialogTitle>
                                                        <DialogDescription>
                                                            <Button variant='outlined' color='red'
                                                                onClick={() => onDelete(comment._id)}
                                                            >Yes</Button>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                        </>
                                    )

                                }
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default CommentCard
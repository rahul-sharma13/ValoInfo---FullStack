import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Skeleton } from './ui/skeleton';

const ArticleTab = ({ article, index }) => {
    const [comments, setComments] = useState(0);

    useEffect(() => {
        const getPostComments = async () => {
            try {
                await axios.get(`/api/v1/comment/getPostComments/${article._id}`).then((res) => {
                    setComments(res.data.data.length);
                }).catch((err) => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        }

        getPostComments();
    }, [article])

    if(!article) {
        return (
            <Skeleton className="h-10"/>
        )
    }

    return (
        <div className={`bg-accent border rounded-sm border-gray-600 p-2 max-w-full ${index === 0 ? "border-t" : ""}`}>
            <div className='flex justify-between items-center'>
                {/* title */}
                <Link to={`/article/${article?.slug}`} className='flex items-baseline gap-2'>
                    <h1 className='text-[15px] text-accent-foreground truncate hover:underline'>{article.title}</h1>
                    <div className='bg-card/40 rounded-sm p-1'>
                        <span className='text-sm'>
                            Admin
                        </span>
                    </div>
                </Link>
                {/* comment number */}
                <p className='text-[11px] text-gray-500'>{comments}</p>
            </div>
        </div>
    )
}

export default ArticleTab
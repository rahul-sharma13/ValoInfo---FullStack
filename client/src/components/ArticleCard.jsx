import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

const ArticleCard = ({article, index}) => {
    return (
        <div className='flex flex-col'>
            <div className='flex gap-1 items-baseline'>
                <Link to={`/article/${article?.slug}`} className='cursor-pointer'>
                    <h1 className='hover:underline text-lg'>{article?.title}</h1>
                </Link>
                <span className='text-sm text-gray-400'>in</span>
                <p className='cursor-pointer hover:underline text-cyan-300 text-sm font-thin'>{article?.topic}</p>
            </div>

            <div className='flex gap-1 text-sm text-gray-400'>
                <span>posted</span>
                <span className=''>{moment(article?.createdAt).fromNow()}</span>
                <div className='h-full w-[1.5px] bg-gray-500' />
                <span>by</span>
                <Link to={`/user/${article.author?.username}`} className='hover:underline text-cyan-400'>
                    <span>{article.author?.username ? article?.author?.username : "deleted" }</span>
                </Link>
            </div>
        </div>
    )
}

export default ArticleCard
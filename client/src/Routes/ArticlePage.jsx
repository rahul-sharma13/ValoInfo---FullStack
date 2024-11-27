import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CommentSection from '../components/CommentSection';
import { Spinner } from '@material-tailwind/react';

const ArticlePage = () => {
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      setLoading(true);
      await axios.get(`${import.meta.env.VITE_BASE_API_URL}/article/get/${params.slug}`).then((res) => {
        // console.log(res);
        setLoading(false);
        setArticle(res.data.data);
      }).catch((err) => {
        setLoading(false);
        console.log(err);
      })
    }

    getArticle();
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner />
      </div>
    )
  }

  return (
    <main className='max-w-6xl mx-auto flex flex-col mt-8'>
      <div className='p-3 bg-accent min-h-fit flex flex-col gap-3 rounded-xl'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-3xl font-bold text-center'>{article?.title}</h1>
          <div className='text-center flex gap-2 items-center justify-center'>
            <img src={article?.author?.avatar} alt='article-img' className='h-12 w-12 object-cover rounded-full' />
            <div className='text-sm flex flex-col items-start justify-start'>
              <Link to={`/user/${article?.author?.username}`}>
                <span className='cursor-pointer'>{article?.author?.username}</span>
              </Link>
              <span className='text-gray-700'>{moment(article?.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>

        <img src={article?.image} alt={article?.title} className='w-[60%] mx-auto h-96 object-cover' />

        <div className='post-content p-3' dangerouslySetInnerHTML={{ __html: article && article.content }}>
        </div>
      </div>

      <CommentSection postId={article?._id}/>
    </main>
  )
}

export default ArticlePage
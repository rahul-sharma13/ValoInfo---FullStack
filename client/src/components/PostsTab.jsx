import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const PostsTab = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        await axios.get(`http://localhost:8000/api/v1/post/getposts?UserId=${currentUser._id}`, { withCredentials: true, credentials: 'include' }).then((res) => {
          // console.log(res?.data?.data?.posts);
          setLoading(false);
          setUserPosts(res?.data?.data?.posts);
          if (res?.data?.data?.posts?.length < 9) {
            setShowMore(false);
          }
        }).catch((err) => {
          console.log(err);
          setLoading(false);
        })
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    if (currentUser && currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      await axios.get(`http://localhost:8000/api/v1/user/getposts?startIndex=${startIndex}`, { withCredentials: true, credentials: 'include' }).then((res) => {
        setUsers((prev) => [...prev, ...res?.data?.data?.posts]);
        if (res?.data?.data?.posts?.length < 9) {
          setShowMore(false);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col w-[700px]">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {
              currentUser?.isAdmin && userPosts.length > 0 ?
                (
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border text-center font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">Date Updated</th>
                        <th scope="col" className="px-6 py-4">Title</th>
                        <th scope="col" className="px-6 py-4">Category</th>
                        <th scope="col" className="px-6 py-4">Delete</th>
                        <th scope="col" className="px-6 py-4">Edit</th>
                      </tr>
                    </thead>
                    {(userPosts.map((post, index) => (
                      <tbody key={index}>
                        <tr className="border dark:border-neutral-500 text-center">
                          <td className="whitespace-nowrap px-6 py-4 text-center font-medium">
                            {new Date(post?.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 hover:underline cursor-pointer">
                            <Link to={`/post/${post?.slug}`}>
                              {post?.title.slice(0, 10)}...
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{post?.topic}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span className="text-red-500 hover:underline cursor-pointer">
                              Delete
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link to={`/update-post/${post?._id}`}>
                              <span className="text-teal-500 cursor-pointer hover:underline">Edit</span>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    )))}
                  </table>
                )
                :
                "No posts from the user yet!"
            }

            {
              showMore && (
                <Button color="black" onClick={handleShowMore}>
                  Show More
                </Button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostsTab
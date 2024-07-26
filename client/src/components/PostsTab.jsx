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
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        await axios.get(`https://valoinfo-fullstack.onrender.com/api/v1/post/getuserposts/${currentUser._id}`, { withCredentials: true, credentials: 'include' }).then((res) => {
          // console.log(res);
          setLoading(false);
          setUserPosts(res?.data?.data);
          if (res?.data?.data.length < 9) {
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

    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      await axios.get(`https://valoinfo-fullstack.onrender.com/api/v1/post/getuserposts/${currentUser._id}?startIndex=${startIndex}`, { withCredentials: true, credentials: 'include' }).then((res) => {
        setUsers((prev) => [...prev, ...res?.data?.data?.posts]);
        if (res?.data?.data.length < 9) {
          setShowMore(false);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`https://valoinfo-fullstack.onrender.com/api/v1/post/delete/${id}`, { withCredentials: true, credentials: "include" }).then((res) => {
        console.log(res);
        setUserPosts((prev) => prev.filter((post) => post._id !== id));
        setMessage(res?.data?.message);
      }).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    loading ? "Please wait..." : (
      <div className="flex flex-col w-[700px]">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden flex items-center justify-center">
              {userPosts.length === 0 ? (
                <span className="text-gray-600 text-base text-center">No posts from the user yet</span>
              ) : (
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
                          <span className="text-red-500 hover:underline cursor-pointer" onClick={() => handleDeletePost(post._id)}>
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
              )}
              {
                showMore && (
                  <Button color="black" onClick={handleShowMore}>
                    Show More
                  </Button>
                )
              }

              {
                message && (
                  <span className="text-gray-600 text-base text-center">{message}</span>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default PostsTab
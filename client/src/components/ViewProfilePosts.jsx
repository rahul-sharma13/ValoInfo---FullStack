import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ViewProfilePosts = ({ userId }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserPosts = async () => {
            try {
                setLoading(true);
                await axios.get(`${import.meta.env.VITE_BASE_API_URL}/post/getuserposts/${userId}`).then((res) => {
                    console.log(res);
                    setPosts(res.data.data);
                    setLoading(false);
                    setError(null);
                }).catch((err) => {
                    // console.log(err);
                    setError(res?.response?.data?.message || "Something went wrong");
                    setLoading(false);
                });
            } catch (error) {
                // console.log(error);
                setError("Something went wrong");
                setLoading(false);
            }
        }

        getUserPosts();
    }, [userId])

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <table className="w-[700px] text-left text-sm font-light">
            <thead className="border text-center font-medium dark:border-neutral-500">
                <tr>
                    <th scope="col" className="px-6 py-4">Date Updated</th>
                    <th scope="col" className="px-6 py-4">Title</th>
                    <th scope="col" className="px-6 py-4">Category</th>
                </tr>
            </thead>
            {(posts.map((post, index) => (
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
                    </tr>
                </tbody>
            )))}
        </table>
    )
}

export default ViewProfilePosts
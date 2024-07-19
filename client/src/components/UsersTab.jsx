import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react';

const UsersTab = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                await axios.get("http://localhost:8000/api/v1/user/getUsers", { withCredentials: true, credentials: 'include' }).then((res) => {
                    // console.log(res);
                    setLoading(false);
                    setUsers(res?.data?.data?.users);
                    if (res?.data?.data?.users.length < 9) {
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
            fetchUsers();
        }
    }, [])

    // console.log(users);

    const handleShowMore = async () => {
        const startIndex = users.length;

        try {
            await axios.get(`http://localhost:8000/api/v1/user/getUsers?startIndex=${startIndex}`, { withCredentials: true, credentials: 'include' }).then((res) => {
                setUsers((prev) => [...prev, ...res?.data?.data?.users]);
                if (res?.data?.data.length < 9) {
                    setShowMore(false);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const adminDeletes = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/user/delete/${id}`, { withCredentials: true, credentials: 'include' }).then((res) => {
                setMessage(res?.data?.data?.message);
                setUsers((prev) => prev.filter((user) => user._id !== id));
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col w-[700px]">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    <div className="overflow-hidden">
                        {
                            loading ? "Please wait..." :
                                (
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border text-center font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">Date Created</th>
                                                <th scope="col" className="px-6 py-4">Avatar</th>
                                                <th scope="col" className="px-6 py-4">Username</th>
                                                <th scope="col" className="px-6 py-4">Email</th>
                                                <th scope="col" className="px-6 py-4">Admin</th>
                                                <th scope="col" className="px-6 py-4">Delete</th>
                                            </tr>
                                        </thead>
                                        {/* {console.log(users)} */}
                                        {users && users.length > 0 && (users.map((user, index) => (
                                            <tbody key={index}>
                                                <tr className="border dark:border-neutral-500 text-center">
                                                    <td className="whitespace-nowrap px-6 py-4 text-center font-medium">
                                                        {new Date(user?.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 flex items-center justify-center">
                                                        <img
                                                            src={user?.avatar}
                                                            alt="avatar"
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">{user?.username.slice(0,5)}...</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{user?.email}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {
                                                            user?.isAdmin ? (<Button color="red" variant="outlined">Remove</Button>) : (<Button color="green" variant="outlined">Add</Button>)
                                                        }
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span className="text-red-500 cursor-pointer hover:underline" onClick={() => {
                                                            adminDeletes(user._id)
                                                        }}>Delete</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )))}
                                    </table>
                                )
                        }

                        {
                            showMore ? (
                                <Button color="black" onClick={handleShowMore}>
                                    Show More
                                </Button>
                            ) : null
                        }
                        {
                            message && (
                                <p className="text-center text-green-500">{message}</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersTab
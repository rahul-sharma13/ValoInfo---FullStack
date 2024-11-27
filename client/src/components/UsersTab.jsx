import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react';
import { Input } from './ui/input';
import toast from 'react-hot-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { LuDot } from "react-icons/lu";

const UsersTab = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState("dsc");

    const handleOrder = (value) => {
        setOrder(value);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/user/getUsers?order=${order}`, { withCredentials: true, credentials: 'include' }).then((res) => {
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
    }, [order])

    // console.log(users);
    const handleShowMore = async () => {
        const startIndex = users.length;

        try {
            await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/user/getUsers?startIndex=${startIndex}`, { withCredentials: true, credentials: 'include' }).then((res) => {
                setUsers((prev) => [...prev, ...res?.data?.data?.users]);
                if (res?.data?.data.users.length < 9) {
                    setShowMore(false);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    // deleted by admin functionality
    const adminDeletes = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_LOCAL_BASE_URL}/user/delete/${id}`, { withCredentials: true }).then((res) => {
                setMessage(res?.data?.data?.message);
                setUsers((prev) => prev.filter((user) => user._id !== id));
                toast.success("User profile deleted!");
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }

    // managing user roles
    const manageAdmin = async (username, operation) => {
        if (!username) {
            toast.error("Username is required!");
            return;
        }

        if (!["add", "remove"].includes(operation)) {
            toast.error("Invalid operation!");
            return;
        }

        const baseURL = import.meta.env.VITE_LOCAL_BASE_URL;
        const successMessage = operation === "add"
            ? "User is added as an admin!"
            : "User is removed as an admin!";

        try {
            await axios.post(
                `${baseURL}/user/manageadmin/${username}?operation=${operation}`,
                {},
                { withCredentials: true }
            );
            toast.success(successMessage);
        } catch (err) {
            if (err.response?.status === 401) {
                toast.error("Username does not exist.");
            } else {
                const errorMessage = err.response?.data?.message || "Something went wrong!";
                toast.error(errorMessage);
            }
        }
    }

    return (
        loading ? (
            <p className="dark:text-white text-black">Loading...</p>
        ) : (
            <div className="flex flex-col w-full items-center px-4 md:px-0">
                <div className='flex flex-row w-full items-start justify-center gap-2'>
                    <Input
                        placeholder="Find User"
                        className="w-full max-w-sm md:max-w-md mb-4"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select onValueChange={handleOrder}>
                        <SelectTrigger className='w-[140px]'>
                            <SelectValue placeholder='Sort' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sort</SelectLabel>
                                <SelectItem value="asc">
                                    <p className="flex flex-row justify-center items-center">
                                        Oldest <span>{order === "asc" && (<LuDot size={30} />)}</span>
                                    </p>
                                </SelectItem>
                                <SelectItem value="dsc" className="flex">
                                    <p className="flex flex-row justify-center items-center">
                                        Newest <span>{order === "dsc" && (<LuDot size={30} />)}</span>
                                    </p>
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="overflow-x-auto w-full">
                    <div className="inline-block min-w-full">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border text-center font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-2 md:px-6 py-4">Date Created</th>
                                        <th scope="col" className="px-2 md:px-6 py-4">Avatar</th>
                                        <th scope="col" className="px-2 md:px-6 py-4">Username</th>
                                        <th scope="col" className="px-2 md:px-6 py-4">Email</th>
                                        <th scope="col" className="px-2 md:px-6 py-4">Admin</th>
                                        <th scope="col" className="px-2 md:px-6 py-4">Delete</th>
                                    </tr>
                                </thead>
                                {users &&
                                    users.length > 0 &&
                                    users
                                        .filter(
                                            (user) =>
                                                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                user.email.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((user, index) => (
                                            <tbody key={index}>
                                                <tr className="border dark:border-neutral-500 text-center">
                                                    <td className="whitespace-nowrap px-2 md:px-6 py-4 text-center font-medium">
                                                        {new Date(user?.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="whitespace-nowrap px-2 md:px-6 py-4 flex items-center justify-center">
                                                        <img
                                                            src={user?.avatar}
                                                            alt="avatar"
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    </td>
                                                    <td className="whitespace-nowrap px-2 md:px-6 py-4">
                                                        {user?.username}
                                                    </td>
                                                    <td className="whitespace-nowrap px-2 md:px-6 py-4">{user?.email}</td>
                                                    <td className="whitespace-nowrap px-2 md:px-6 py-4">
                                                        {user?.isAdmin ? (
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button
                                                                        color="red"
                                                                        variant="outlined"
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => manageAdmin(user?.username, "remove")}>Yes</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        ) : (
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button
                                                                        color="green"
                                                                        variant="outlined"
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => manageAdmin(user?.username, "add")}>Yes</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-2 md:px-6 py-4">
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    className="text-red-500 cursor-pointer hover:underline"
                                                                    variant="text"
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => {
                                                                        adminDeletes(user._id);
                                                                    }}>Yes</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                            </table>
                        </div>
                    </div>
                </div>
                {
                    showMore && (
                        <div className="flex items-center justify-center mt-5">
                            <Button color="black" onClick={handleShowMore}>
                                Show More
                            </Button>
                        </div>
                    )
                }
                {message && <p className="text-center text-green-500">{message}</p>}
            </div >
        )
    )
}

export default UsersTab
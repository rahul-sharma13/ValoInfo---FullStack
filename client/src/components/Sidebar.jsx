import React, { useEffect, useState } from 'react';
import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
} from "@material-tailwind/react";
import {
    ChatBubbleLeftEllipsisIcon,
    UserCircleIcon,
    UserGroupIcon
} from "@heroicons/react/24/solid";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [menu, setMenu] = useState("Profile");
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setMenu(tabFromUrl);
        }
    }, [location.search])


    return (
        <Card className="md:h-[calc(100vh-2rem)] bg-black w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 md:ml-44 md:mr-2 mx-auto bg-accent">
            <List className="dark:text-white">
                <Link to="/account?tab=Profile">
                    <ListItem onClick={() => setMenu("Profile")}>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Profile
                        <ListItemSuffix className="bg-primary text-primary-foreground h-full w-16 rounded-full">
                            <span className="text-xs font-semibold uppercase">
                                {currentUser?.isAdmin ? "Admin" : "User"}
                            </span>
                        </ListItemSuffix>
                    </ListItem>
                </Link>
                {
                    currentUser && currentUser.isAdmin && (
                        <Link to="/account?tab=articles">
                            <ListItem onClick={() => setMenu("articles")}>
                                <ListItemPrefix>
                                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Articles
                            </ListItem>
                        </Link>
                    )
                }
                <Link to="/account?tab=Posts">
                    <ListItem onClick={() => setMenu("Posts")}>
                        <ListItemPrefix>
                            <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Posts
                    </ListItem>
                </Link>
                {
                    currentUser && currentUser.isAdmin && (
                        <Link to="/account?tab=Users">
                            <ListItem onClick={() => setMenu("Users")}>
                                <ListItemPrefix>
                                    <UserGroupIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Users
                            </ListItem>
                        </Link>
                    )
                }
            </List>
        </Card>
    )
}

export default Sidebar
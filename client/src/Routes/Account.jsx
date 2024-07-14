import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
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
import ProfileTab from '../components/ProfileTab';

const Account = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [menu, setMenu] = useState("Profile");

  return (
    <section>
      <div className='flex flex-row gap-3'>
        <Card className="h-[calc(100vh-2rem)] bg-black w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ml-52 bg-accent">
          <List className="dark:text-white">
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
            <ListItem onClick={() => setMenu("Posts")}>
              <ListItemPrefix>
                <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
              </ListItemPrefix>
              Posts
            </ListItem>
            <ListItem onClick={() => setMenu("Users")}>
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              Users
            </ListItem>
          </List>
        </Card>

        {/* content */}
        <div className="max-w-lg mx-auto">
          {menu === "Profile" && (
            <ProfileTab />
          )}
          {menu === "Posts" && (
            <div>
              <h1>Posts</h1>
              <p>Posts</p>
            </div>
          )}
          {menu === "Users" && (
            <div>
              <h1>Users</h1>
              <p>Users</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Account
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileTab from '../components/ProfileTab';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Account = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [menu, setMenu] = useState("Profile");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setMenu(tabFromUrl);
    }
  },[location.search])

  return (
    <section>
      <div className='flex flex-col md:flex-row gap-3'>
        {/* sidebar */}
        <Sidebar />

        {/* content */}
        <div className="max-w-lg mx-auto">
          {menu === "Profile" && (
            <ProfileTab />
          )}
          {menu === "adminPosts" && (
            <div>
              <h1>Admin Posts</h1>
              <p>Admin Posts</p>
            </div>
          )}
          {menu === "Posts" && (
            <div>
              <h1>Posts</h1>
              <p>Posts</p>
            </div>
          )}
          { currentUser && currentUser.isAdmin && menu === "Users" && (
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
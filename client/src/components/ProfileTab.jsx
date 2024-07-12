import { Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SignOut from './SignOut';
import { deleteUserFail, deleteUserStart, deleteUserSuccess, updateUserFail, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';

const ProfileTab = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  // console.log(loading);

  const handleUserUpdate = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      await axios.patch(`http://localhost:8000/api/v1/user/update/${currentUser._id}`, formData, { withCredentials: true, credentials: 'include' })
        .then((res) => {
          // console.log(res);
          dispatch(updateUserSuccess(res?.data?.data));
        })
        .catch((err) => dispatch(updateUserFail(err?.response?.data?.message)));
    } catch (error) {
      dispatch(updateUserFail(error))
    }
  }

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      await axios.delete(`http://localhost:8000/api/v1/user/delete/${currentUser._id}`, { withCredentials: true, credentials: 'include' })
        .then((res) => {
          console.log(res);
          dispatch(deleteUserSuccess());
        })
        .catch((err) => dispatch(signOutFail(err?.response?.data?.message)));
    } catch (error) {
      dispatch(deleteUserFail(error?.response?.data?.message));
    }
  }

  return (
    <>
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUserUpdate}>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img src={currentUser?.avatar} alt="user" className="rounded-full w-full h-full border object-cover border-gray-400" />
        </div>
        <Input
          id="username"
          label="username"
          size="lg"
          color="blue"
          className="w-[500px]"
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />

        <Input id="email" type="email" label="email" size="lg" color="blue" className="w-[500px]" defaultValue={currentUser?.email} onChange={handleChange} />
        <Input id="password" type="password" label="password" size="lg" color="blue" className="w-[500px]" placeholder="password" onChange={handleChange} />
        <Button color="blue" variant="gradient" fullWidth size="lg" ripple={true} type="submit" loading={loading} className="self-center">Update</Button>
      </form>
      <div className="flex gap-56 mt-5">
        <Button color="red" variant="text" onClick={handleDelete}>Delete Account</Button>
        <SignOut />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </>
  )
}

export default ProfileTab
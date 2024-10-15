import { Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SignOut from './SignOut';
import { deleteUserFail, deleteUserStart, deleteUserSuccess, updateUserFail, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const ProfileTab = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  // update
  const handleUserUpdate = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      await axios.put(`https://valo-info-api.vercel.app/api/v1/user/update/${currentUser._id}`, formData, { withCredentials: true, credentials: 'include' })
        .then((res) => {
          // console.log(res);
          dispatch(updateUserSuccess(res?.data?.data));
        })
        .catch((err) => dispatch(updateUserFail(err?.response?.data?.message)));
    } catch (error) {
      dispatch(updateUserFail(error))
    }
  }

  // delete
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      await axios.delete(`https://valo-info-api.vercel.app/api/v1/user/delete/${currentUser._id}`, { withCredentials: true, credentials: 'include' })
        .then((res) => {
          console.log(res);
          dispatch(deleteUserSuccess());
        })
        .catch((err) => dispatch(signOutFail(err?.response?.data?.message)));
    } catch (error) {
      dispatch(deleteUserFail(error?.response?.data?.message));
    }
  }

  // upload avatar
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileUrl(URL.createObjectURL(file));
    }
  }

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file); // to get percentage,error etc of file uploaded

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
      // console.log('upload is ' + progress + '%done');
    },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL });
          })
      }
    )
  }

  return (
    <>
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUserUpdate}>
        <input type='file' ref={fileInput} hidden onChange={handleImageChange} />
        <div className="w-32 h-32 cursor-pointer self-center shadow-md overflow-hidden rounded-full" onClick={() => { fileInput.current.click() }}>
          <img
            src={fileUrl || currentUser?.avatar}
            alt="user"
            className={`rounded-full w-full h-full border-4 object-cover self-center border-blue-500`}
          />
        </div>
          {file && <p className="text-center text-blue-500">{filePerc}%</p>}
        <Input
          id="username"
          label="Username"
          size="lg"
          color="blue"
          className="w-[500px]"
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />

        <Input
          id="email"
          type="email"
          label="Email"
          size="lg"
          color="blue"
          className="w-[500px]"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          size="lg"
          color="blue"
          className="w-[500px]"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button
          color="blue"
          variant="gradient"
          fullWidth
          size="lg"
          ripple={true}
          type="submit"
          loading={loading}
          className="self-center"
        >
          Update
        </Button>
      </form>
      <div className="flex gap-56 mt-5">
        <Button color="red" variant="text" onClick={handleDelete}>
          Delete Account
        </Button>
        <SignOut />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {fileUploadError && (
        <p className="text-red-500 text-center">File should be less than 2mb</p>
      )}
    </>
  );
}

export default ProfileTab
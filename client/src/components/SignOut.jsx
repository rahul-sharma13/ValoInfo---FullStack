import { Button } from '@material-tailwind/react'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signOutFail, signOutStart, signOutSuccess } from '../redux/user/userSlice'

const SignOut = () => {
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            dispatch(signOutStart());
            await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/auth/signout`, { withCredentials: true, credentials: 'include' }).then((res) => {
                dispatch(signOutSuccess());
            }).catch((error) => {
                dispatch(signOutFail(error));
            })
        } catch (error) {
            dispatch(signOutFail(error));
        }
    }

    return (
        <Button variant="text" color="red" onClick={handleSignOut}>Sign Out</Button>
    )
}

export default SignOut
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signOutFail, signOutStart, signOutSuccess } from '../redux/user/userSlice'

const SignOut = () => {
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            dispatch(signOutStart());
            await axios.get("http://localhost:8000/api/v1/auth/signout", { withCredentials: true, credentials: 'include' }).then((res) => {
                dispatch(signOutSuccess());
            }).catch((error) => {
                dispatch(signOutFail(error));
            })
        } catch (error) {
            dispatch(signOutFail(error));
        }
    }

    return (
        <Button variant="outline" onClick={handleSignOut}>SignOut</Button>
    )
}

export default SignOut
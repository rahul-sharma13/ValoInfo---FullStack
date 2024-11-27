import { Button } from '@material-tailwind/react';
import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInUserSuccess, signInUserFail, signInUserStart } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        // if we dont add this then we would be logged in to the account chosen previuosly in the pop up window
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            dispatch(signInUserStart());
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            // console.log(resultsFromGoogle);

            await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/googlesignin`, { name: resultsFromGoogle.user.displayName, email: resultsFromGoogle.user.email }, { withCredentials: true }).then((response) => {
                dispatch(signInUserSuccess(response.data.data));
                // console.log(response.data);
                navigate('/');
            }).catch((err) => {
                dispatch(signInUserFail(err?.response?.data?.message));
                // console.log(err.response.data);
            })
        } catch (error) {
            dispatch(signInUserFail("Something went wrong"));
        }
    }

    return (
        <Button
            size="lg"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3 mt-3"
            type="button"
            onClick={handleGoogleSignIn}
        >
            <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
            Continue with Google
        </Button>
    )
}

export default OAuth
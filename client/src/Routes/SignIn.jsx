import { AiOutlineMail } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signInUserFail, signInUserStart, signInUserSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";

const SignIn = () => {
    const navigate = useNavigate();
    const { error, loading, currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }


    const { mutate, isPending, isError } = useMutation({
        mutationKey: ["signIn"],
        mutationFn: async (formData) => {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/auth/signin`,
                formData,
                { withCredentials: true },
            );

            return response.data.data;
        },
        onSuccess: (data) => {
            dispatch(signInUserSuccess(data));
            toast.success("Signed in successfully!");
            setTimeout(() => navigate("/"), 1300);
        },
        onError: (error) => {
            const { response } = error;

            if (response?.status === 400) {
                dispatch(signInUserFail("All fields are required!"));
            } else if (response?.status === 401) {
                dispatch(signInUserFail("Wrong credentials"));
            } else if (response?.status === 404) {
                dispatch(signInUserFail("User not found. Please sign up!"));
            } else {
                dispatch(signInUserFail("Something went wrong!"));
            }
        },
    });

    const handleSignIn = (event) => {
        event.preventDefault();

        mutate(formData);
    };
    // mutation.isError && toast.error(mutation.error.response.data.message);

    const goToSignUp = () => {
        navigate("/SignUp");
    }

    return (
        <div className="bg-accent sm:max-w-3xl max-w-[350px] mx-auto sm:h-[500px] h-[400px] my-6 rounded-[40px] font-poppins tracking-wider">
            <div className="flex sm:ml-10 ml-0">
                {/* left form */}
                <div className="flex flex-col items-center mt-10 flex-1">
                    <div className="mb-5">
                        <h1 className="text-center sm:text-[60px] text-[30px] font-bold">Welcome</h1>
                        <p className="text-[14px] text-center text-gray-600">
                            We are glad to see you back with us
                        </p>
                    </div>
                    <div>
                        <form className="flex flex-col gap-3" onSubmit={handleSignIn}>
                            <div className="flex relative">
                                <input
                                    placeholder="Email"
                                    id="email"
                                    type="email"
                                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg w-full px-5 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    onChange={handleChange}
                                />
                                <AiOutlineMail className="absolute top-3 right-2" />
                            </div>

                            <div className="flex relative">
                                <input
                                    placeholder="Password"
                                    id="password"
                                    type="password"
                                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-5 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    onChange={handleChange}
                                />
                                <CiLock className="absolute top-3 right-2" />
                            </div>
                            <button className="cursor-pointer group relative flex justify-center gap-1.5 px-7 py-2 bg-black bg-opacity-80 text-[#f1f1f1] rounded-xl hover:bg-opacity-70 shadow-md dark:bg-white dark:text-black" disabled={isPending || currentUser}>
                                {isPending ? <Spinner /> : "Sign In"}
                            </button>
                        </form>
                        <p className="text-center text-[14px] my-3">
                            Don't an account?
                            <span onClick={goToSignUp} className="font-semibold cursor-pointer hover:underline text-[15px] tracking-wide ml-1">SignUp</span> here
                        </p>

                        <OAuth />
                    </div>
                </div>
                {/* right img */}
                <div className="sm:block hidden w-1/2">
                    <img
                        src="https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/fullportrait.png"
                        className="mt-7 object-contain h-[400px]"
                    />
                </div>
            </div>
            {isError && toast.error(`${error}`)}
        </div>
    );
};

export default SignIn;
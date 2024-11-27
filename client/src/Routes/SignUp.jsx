import { AiOutlineMail } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const goToSignIn = () => {
    navigate("/SignIn");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_LOCAL_BASE_URL}/auth/signup`, formData)
        .then((response) => {
          setLoading(false);
          goToSignIn();
        })
        .catch((err) => {
          setError(err?.response?.data?.message);
        })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-accent sm:max-w-3xl max-w-[350px] mx-auto sm:h-[500px] h-[400px] my-6 rounded-[40px] font-poppins tracking-wider">
      <div className="flex sm:ml-10 ml-0">
        {/* left form */}
        <div className="flex flex-col items-center mt-10 flex-1">
          <div className="mb-1">
            <h1 className="text-center sm:text-[60px] text-[30px] font-bold">Welcome</h1>
          </div>
          <div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit} >
              <div className="flex relative">
                <input
                  onChange={handleChange}
                  placeholder="Email"
                  id="email"
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-5 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                <AiOutlineMail className="absolute top-3 right-2" />
              </div>

              <div className="flex relative">
                <input
                  placeholder="Username"
                  type="text"
                  id="username"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg w-full px-5 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  onChange={handleChange}
                />
                <AiOutlineMail className="absolute top-3 right-2" />
              </div>

              <div className="flex relative">
                <input
                  onChange={handleChange}
                  placeholder="Password"
                  id="password"
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-5 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                <CiLock className="absolute top-3 right-2" />
              </div>
              <button className="cursor-pointer group relative flex justify-center gap-1.5 px-7 py-2 bg-black bg-opacity-80 text-[#f1f1f1] rounded-xl hover:bg-opacity-70 transition shadow-md" disabled={loading}>
                Sign Up
              </button>
            </form>
            <p className="text-center text-[14px] my-3">Have an account?</p>
            <button className=" border-2 border-black px-9 py-3 rounded-xl w-full" onClick={goToSignIn}>
              <span className="font-bold text-[15px]">SignIn</span> to account
            </button>
          </div>
          {error ? <p className="text-red-500 text-sm mt-3">{error}</p> : null}
        </div>
        {/* right img */}
        <div className="sm:block hidden w-1/2">
          <img
            src="https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png"
            className="mt-7 object-contain h-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
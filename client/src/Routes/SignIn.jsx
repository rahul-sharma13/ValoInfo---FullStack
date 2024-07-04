import { AiOutlineMail } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    
  };

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
             <form className="flex flex-col gap-3" onSubmit={handleSubmit}> 
              <div className="flex relative">
                <input
                  placeholder="Email"
                  type="email"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg w-full px-5 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <AiOutlineMail className="absolute top-3 right-2" />
              </div>

              <div className="flex relative">
                <input
                  placeholder="Password"
                  type="password"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-5 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <CiLock className="absolute top-3 right-2" />
              </div>
              <button className="cursor-pointer group relative flex justify-center gap-1.5 px-7 py-2 bg-black bg-opacity-80 text-[#f1f1f1] rounded-xl hover:bg-opacity-70 shadow-md dark:bg-white dark:text-black">
                Sign In
              </button>
            </form>
            <p className="text-center text-[14px] my-3">Don't an account?</p>
            <button onClick={goToSignUp} className=" border-2 border-black px-9 py-3 rounded-xl w-full">
              <span className="font-bold text-[15px] tracking-wide">SignUp</span> here
            </button>
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
    </div>
  );
};

export default SignIn;
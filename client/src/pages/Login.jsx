import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../Axios";
import { useContext } from "react";
import { UserAuthContext } from "../context/UserAuth";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await Axios.post("/auth/login", { username, password });
      if (response.status === 200) {
        setUsername("");
        setPassword("");
        setLoading(false);
        toast.success("Logged In  Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error.response);
      setError(error.response.data?.message);
      setLoading(false);
    }
  };
  // redirect to home page if token exist
  const { authData } = useContext(UserAuthContext);
  if (authData) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div>
        {/* component */}
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    :root { font-family: 'Inter', sans-serif; }\n@supports (font-variation-settings: normal) {\n  :root { font-family: 'Inter var', sans-serif; }\n}\n",
          }}
        />
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 className="text-4xl font-medium">Login</h1>
          <p className="text-slate-500">Hi, Welcome back 👋</p>

          <form action className="my-10">
            <p className="text-red-500 font-bold text-center uppercase">
              {error}
            </p>
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">Email address</p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </label>
              <label htmlFor="password">
                <p className="font-medium text-slate-700 pb-2">Password</p>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>

              {loading ? (
                <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Processing...</span>
                </button>
              ) : (
                <button
                  onClick={(e) => handleLogin(e)}
                  className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Login</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

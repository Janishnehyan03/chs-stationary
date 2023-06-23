import React, { useState } from "react";
import Axios from "../Axios";
import { CircularProgress } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Redirect } from "react-router-dom";
import { UserAuthContext } from "../context/UserAuth";
import { useContext } from "react";
function SignUp() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [loading, setLoading] = useState(false);
  const { userAuth } = useContext(UserAuthContext);

  const classes = [
    "1A",
    "1B",
    "2A",
    "2B",
    "3A",
    "3B",
    "4A",
    "4B",
    "5A",
    "5B",
    "6A",
    "6B",
    "7A",
    "7B",
  ];
  if (userAuth) {
    return <Redirect to="/" />;
  }

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/auth/register", {
        admissionNumber,
        studentClass,
        password,
        username,
      });
      if (res.data.success) {
        setLoading(false);
        setAdmissionNumber("");
        setPassword("");
        setStudentClass("");
        setUsername("");
        toast.success("Account created successfully", {
          position: "top-center",
          autoClose: 5000,
        });

        window.location.reload()
      }
    } catch (error) {
      console.log(error.data);
      setLoading(false);
      toast.error(error.data.message, {
        position: "top-center",
      });
    }
  };
  return (
    <>
      <div className="container py-16">
        <ToastContainer />
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            Create Account
          </h2>
          <form action="#">
            <div className="space-y-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Select an option
                </label>
                <select
                  id="countries"
                  name="studentClass"
                  onChange={(e) => setStudentClass(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option hidden>select class</option>
                  {classes.map((item, key) => (
                    <option
                      className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                      value={item}
                      key={key}
                    >
                      {item}
                    </option>
                  ))}
                </select>

                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Class
                </label>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Admission Number
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-primary placeholder:text-gray-700"
                  placeholder="admission number"
                  onChange={(e) => setAdmissionNumber(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <CircularProgress />
            ) : (
              <button
                onClick={signUp}
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium mt-4"
              >
                Create Account
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;

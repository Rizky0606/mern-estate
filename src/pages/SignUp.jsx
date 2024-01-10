import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API } from "../../libs/configAPI";
import { AxiosError } from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/signup", formData);
      navigate("/sign-in");
      setIsLoading(false);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto ">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Input Username"
            className="border p-3 rounded-lg "
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Input Email"
            className="border p-3 rounded-lg "
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Input Password"
            className="border p-3 rounded-lg "
            id="password"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            onClick={() => setIsLoading(true)}
          >
            {isLoading === true ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-700">Sign In</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "../components";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/auth/authSlice";
import { Welcome } from "../components";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const { isLoading, isSuccess, isError, isDone, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    setError({
      email: "",
      password: "",
    });
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isError) {
      message.split(",").forEach((err) => {
        let message = "";
        const item = err.split(":");
        if (item[1] === "required") message = `Please enter your ${item[0]}`;
        if (item[1] === "notFound")
          message = `Email not found. Please make sure you have entered the correct email or consider signing up`;
        if (item[1] === "wronge")
          message = `Incorrect password. Please double-check your password and try again`;
        setError((prev) => ({ ...prev, [item[0]]: message }));
      });
    }
    if (isSuccess) navigate("/");
    if (isDone) dispatch(reset());
  }, [dispatch, isDone, isError, isSuccess, message, navigate]);
  return (
    <div className="mt-10 md:mt-0 min-h-screen relative max-w-7xl mx-auto px-4">
      <div className="relative min-h-screen top-[75px] md:top-0 flex flex-col-reverse md:flex-row gap-20 md:gap-8">
        <div className="flex flex-1 basis-1/2 justify-center md:justify-start items-center min-h-full ">
          <Welcome />
        </div>
        <div className="flex flex-1 basis-1/2 items-center justify-center min-h-full px-4 md:px-10 xl:px-32">
          <form onSubmit={onSubmit} className="w-full">
            <h1 className="text-center mb-10 text-5xl ">Login</h1>
            <Input
              err={error.email}
              type="text"
              label="Enter your email"
              id="email"
              value={formData.email}
              setFormData={setFormData}
            />
            <Input
              err={error.password}
              type="password"
              label="Enter your password"
              id="password"
              value={formData.password}
              setFormData={setFormData}
            />
            <button
              type="submit"
              className="w-fit block py-2 pl-3 pr-10 text-xl rounded-md bg-primary-200 text-white"
            >
              {isLoading ? "Login..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

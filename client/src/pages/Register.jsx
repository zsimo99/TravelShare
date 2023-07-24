import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "../components";
import { useNavigate } from "react-router-dom";
import { registerUser, reset } from "../features/auth/authSlice";
import { Welcome } from "../components";

const Login = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState({
    displayName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { isLoading, isSuccess, isError, isDone, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    setError({
      displayName: "",
      email: "",
      password: "",
      password2: "",
    });
    if (formData.password !== formData.password2)
      setError((prev) => ({ ...prev, password2: "Confirme your password" }));
    dispatch(registerUser(formData));
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
        if (item[1] === "notValide") message = `Please enter a valide email`;
        if (item[1] === "duplicate")
          message = `Email already in use. Please use a different email or proceed to the login page`;
        setError((prev) => ({ ...prev, [item[0]]: message }));
      });
      console.log(message);
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
            <h1 className="text-center mb-10 text-5xl ">Register</h1>
            <Input
              err={error.displayName}
              type="text"
              label="Enter your name"
              id="displayName"
              value={formData.displayName}
              setFormData={setFormData}
            />
            <Input
              err={error.email}
              type="email"
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
            {formData.password && (
              <Input
                err={error.password2}
                type="password"
                label="Confirme password"
                id="password2"
                value={formData.password2}
                setFormData={setFormData}
              />
            )}
            <button
              type="submit"
              className="w-fit block py-2 pl-3 pr-10 text-xl rounded-md bg-primary-200 text-white"
            >
              {isLoading ? "Register..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

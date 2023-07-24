import React, { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Input = ({ label, id, value, setFormData, type, err }) => {
  const [isValue, setIsValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (value) setIsValue(true);
    console.log("hello");
  }, [value]);

  return (
    <div className={`mb-4 ${err && "inputStartAnimation"}`}>
      <div className="relative z-[1]">
        {type === "password" && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={`cursor-pointer absolute text-xl top-[50%] translate-y-[-50%] ${
              err ? "text-[#dc3545]" : "text-primary-100 "
            } right-3`}
          >
            {showPassword ? <BsEye /> : <BsEyeSlash />}
          </span>
        )}
        <label
          htmlFor={id}
          className={`transition-all duration-300 absolute left-2  z-[-1] translate-y-[-50%] ${
            err && "text-[#dc3545]"
          } ${
            isValue ? " text-sm bg-back top-0 z-[1] px-1" : "top-[50%]  text-xl"
          } `}
        >
          {label}
        </label>
        <input
          maxLength={type === "password" ? 15 : 25}
          onFocus={() => setIsValue(true)}
          onBlur={() => (value === "" ? setIsValue(false) : setIsValue(true))}
          value={value}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
          }
          id={id}
          className={`bg-transparent pl-3 py-2 w-full border-2 ${
            err ? "border-[#dc3545]" : "border-primary-100"
          } rounded-md outline-none ${type === "password" && "pr-10"}`}
        />
      </div>
      <p className="text-[14px] text-[#dc3545]">{err}</p>
    </div>
  );
};

export default Input;

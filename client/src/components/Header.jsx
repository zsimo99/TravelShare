import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const clickHandle = () => {
    setOpen((prev) => !prev);
  };
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="h-[75px] bg-primary-100 text-white shadow-black shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container m-auto p-4 flex items-center justify-between relative z-10 h-full ">
        <div className="brand">
          <Link to="/" className="font-bold transition-[color] text-xl cursor-pointer hover:text-secondary-100">
            TravelShare
          </Link>
        </div>
        <div
          className="block absolute top-[50%] right-4 translate-y-[-50%] md:hidden"
          onClick={clickHandle}
        >
          {open ? <VscChromeClose /> : <FaBars />}
        </div>
        <ul
          className={`absolute transition-[transform] top-[100%] bg-primary-100 md:bg-transparent left-0 w-full flex flex-col md:w-fit md:text-xl md:space-x-3 md:flex-row md:static md:scale-y-100 origin-top ${open ? "scale-y-100" : "scale-y-0"
            }`}
        >
          {user ? (
            <>
              <li
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="navLink"
              >
                log Out
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  className="navLink"
                  to="/login"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  className="navLink"
                  to="register"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { Link, NavLink } from "react-router";
import { MdCall, MdDashboard } from "react-icons/md";
import {
  BiHome,
  BiLogIn,
  BiMenu,
  BiMoney,
  BiUserPlus,
} from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import useAuth from "../Hooks/useAuth";
import Logo from "./Shared/Logo";
import ProfileAvatar from "./Shared/ProfileAvatar";
import ThemeToggle from "./Shared/ThemeToggle";

const Navbar = () => {
  const { currentUser, loading } = useAuth();

  const links = loading ? (
    <>
      <li><div className="skeleton h-8 w-20 opacity-20"></div></li>
      <li><div className="skeleton h-8 w-20 opacity-20"></div></li>
      <li><div className="skeleton h-8 w-24 opacity-20"></div></li>
      <li><div className="skeleton h-8 w-28 opacity-20"></div></li>
    </>
  ) : (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `hover:text-accent transition-colors flex items-center gap-2 ${isActive ? "text-accent font-bold underline underline-offset-8" : "text-secondary"}`
          }
        >
          <BiHome /> Home
        </NavLink>
      </li>
      {currentUser && (
        <li>
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              `hover:text-accent transition-colors flex items-center gap-2 ${isActive ? "text-accent font-bold underline underline-offset-8" : "text-secondary"}`
            }
          >
            <MdDashboard /> Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to={"/all-loans"}
          className={({ isActive }) =>
            `hover:text-accent transition-colors flex items-center gap-2 ${isActive ? "text-accent font-bold underline underline-offset-8" : "text-secondary"}`
          }
        >
          <BiMoney /> All-Loans
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            `hover:text-accent transition-colors flex items-center gap-2 ${isActive ? "text-accent font-bold underline underline-offset-8" : "text-secondary"}`
          }
        >
          <BsQuestionCircle /> About
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            `hover:text-accent transition-colors flex items-center gap-2 ${isActive ? "text-accent font-bold underline underline-offset-8" : "text-secondary"}`
          }
        >
          <MdCall /> Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="relative">
      {/* Navbar Container: Navy Blue Background for professional look */}
      <div className="navbar bg-primary text-secondary fixed z-50 top-0 left-0 right-0 px-4 lg:px-12 py-4 shadow-xl border-b border-accent/20">

        <div className="navbar-start">
          <Logo />
        </div>

        {/* Mobile View */}
        <div className="navbar-end xl:hidden gap-3">
          <ThemeToggle />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-accent p-0"
            >
              <BiMenu size={32} />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-primary border border-accent/30 rounded-2xl mt-4 w-60 p-4 shadow-2xl space-y-3"
            >
              {links}
              <hr className="border-accent/20" />
              {currentUser ? (
                <li className="flex flex-row items-center gap-2 p-2">
                  <ProfileAvatar />
                  <Link to="/profile" className="text-accent font-bold">My Profile</Link>
                </li>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="btn btn-outline btn-accent rounded-full w-full">Login</Link>
                  <Link to="/register" className="btn btn-accent text-primary rounded-full w-full font-bold">Join Now</Link>
                </div>
              )}
            </ul>
          </div>
        </div>

        {/* Desktop View */}
        <div className="navbar-center hidden xl:flex">
          <ul className="menu menu-horizontal px-1 gap-8 text-base">
            {links}
          </ul>
        </div>

        <div className="navbar-end hidden xl:flex gap-4">
          <ThemeToggle />
          {currentUser ? (
            <div className="border-2 border-accent rounded-full p-0.5 hover:scale-105 transition-transform cursor-pointer">
              <ProfileAvatar />
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to={"/login"}
                className="btn btn-ghost text-secondary hover:text-accent font-semibold"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="btn btn-accent text-primary rounded-full px-8 font-bold hover:shadow-[0_0_15px_rgba(74,222,128,0.5)] transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-20"></div>
    </div>
  );
};

export default Navbar;
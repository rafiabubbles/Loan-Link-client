import React from "react";
import { BiSidebar } from "react-icons/bi";
import Logo from "../Shared/Logo";

const DashNav = () => {
  return (
    <div>
      <nav className="navbar  w-full py-5 bg-accent border-b-2 border-gray-200 dark:border-accent fixed z-50 top-0  mx-auto">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-ghost "
        >
          {/* Sidebar toggle icon */}
          <BiSidebar size={30} className="text-gray-400"></BiSidebar>
        </label>
        <div className="">
          <Logo></Logo>
        </div>
      </nav>
    </div>
  );
};

export default DashNav;

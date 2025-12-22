import React from "react";
import { BiDollar, BiHome, BiMoney, BiPowerOff, BiUser } from "react-icons/bi";
import { Link, Navigate, NavLink } from "react-router";
import { IoAddCircleSharp, IoNewspaperOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import ThemeToggle from "../Shared/ThemeToggle";
import { BsCashStack, BsFillBookmarkCheckFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { MdManageAccounts, MdOutlinePendingActions } from "react-icons/md";
import { RiAccountPinBoxFill } from "react-icons/ri";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../../Hooks/useRole";
const SideNav = () => {
  const { logOutUser } = useAuth();
  const { role, isLoading } = useRole();

  const links = isLoading ? (
    <>
      <li>
        <div className="flex items-center gap-4 p-2">
          <div className="skeleton h-8 w-8 rounded-xl shrink-0"></div>
        </div>
      </li>
      <li>
        <div className="flex items-center gap-4 p-2">
          <div className="skeleton h-8 w-8 rounded-xl shrink-0"></div>
        </div>
      </li>
      <li>
        <div className="flex items-center gap-4 p-2">
          <div className="skeleton h-8 w-8 rounded-xl shrink-0"></div>
        </div>
      </li>
      <li>
        <div className="flex items-center gap-4 p-2">
          <div className="skeleton h-8 w-8 rounded-xl shrink-0"></div>
        </div>
      </li>
      <li>
        <div className="flex items-center gap-4 p-2">
          <div className="skeleton h-8 w-8 rounded-xl shrink-0"></div>
        </div>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link
          to="/dashboard"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Dashboard"
        >
          {/* User icon */}
          <BiHome size={30}></BiHome>
          <span className="is-drawer-close:hidden">Dashboard</span>
        </Link>
      </li>
      {/*--------------------------- Admin */}
      {role.role === "admin" && (
        <>
          <li>
            <NavLink
              to="/dashboard/manage-user"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Manage Users"
            >
              {/* User icon */}
              <BiUser size={30}></BiUser>
              <span className="is-drawer-close:hidden">Manage Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-loans"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="All Loans"
            >
              {/* Money icon */}
              <BiMoney size={30}></BiMoney>
              <span className="is-drawer-close:hidden">All Loans</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/loan-application"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Loan Application"
            >
              {/* Newspaper icon */}
              <IoNewspaperOutline size={30}></IoNewspaperOutline>
              <span className="is-drawer-close:hidden">Loan Application</span>
            </NavLink>
          </li>
        </>
      )}

      {/*------------------- Manager */}
      {role.role === "manager" && (
        <>
          <li>
            <NavLink
              to="/dashboard/manage-loan"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Manage Loan"
            >
              <MdManageAccounts size={30}></MdManageAccounts>
              <span className="is-drawer-close:hidden">Manage Loan</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/approved-loan"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Approved Loan"
            >
              <BsFillBookmarkCheckFill size={30}></BsFillBookmarkCheckFill>
              <span className="is-drawer-close:hidden">Approved Loan</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/pending-loan"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Pending Loan"
            >
              <MdOutlinePendingActions size={30}></MdOutlinePendingActions>
              <span className="is-drawer-close:hidden">Pending Loan</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-loan"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Add Loan"
            >
              <IoAddCircleSharp size={30}></IoAddCircleSharp>
              <span className="is-drawer-close:hidden">Add Loan</span>
            </NavLink>
          </li>
        </>
      )}
      {/*--------------------------- User */}
      {role.role === "user" && (
        <li>
          <NavLink
            to="/dashboard/my-loan"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="My Loan"
          >
            {/* Newspaper icon */}
            <GiReceiveMoney size={30}></GiReceiveMoney>
            <span className="is-drawer-close:hidden">My Loan</span>
          </NavLink>
        </li>
      )}
      {/* Profile */}

      <li>
        <NavLink
          to="/profile"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Profile"
        >
          {/* Profile icon */}
          <RiAccountPinBoxFill size={30} />
          <span className="is-drawer-close:hidden">My Profile</span>
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("Logout successfully");
      })
      .catch(() => {
        toast.error("Logout failed");
      });
  };

  return (
    <div className="flex flex-col items-baseline h-screen pb-5 w-full">
      <ul className="menu gap-4 w-full grow text-xl font-semibold flex flex-col h-full justify-center">
        {/* List item */}
        {links}
      </ul>
      <div className="flex flex-col gap-4 items-center justify-center w-full text-center">
        <button
          data-tip="Logout"
          className="btn btn-ghost tooltip tooltip-right"
          onClick={handleLogOut}
        >
          <BiPowerOff size={30}></BiPowerOff>
        </button>
        <div>
          <ThemeToggle></ThemeToggle>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

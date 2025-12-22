import React from "react";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ProfileAvatar = () => {
  const { currentUser, logOutUser } = useAuth();

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("Logout successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div>
        <div className="dropdown dropdown-end rounded-full">
          <div tabIndex={0} role="button" className="avatar">
            <div className="ring-primary ring-offset-base-100 rounded-full w-13 ring-2 ring-offset-2">
              <img src={currentUser?.photoURL} />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu dropdown-content  bg-accent rounded-box z-1 mt-3 w-52 p-2 shadow gap-2"
          >
            <li className="text-primary text-xl text-center">
              <Link to={"/profile"}>{currentUser?.displayName}</Link>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="btn rounded-full btn-primary text-secondary"
              >
                Log Out
              </button>
            </li>
            <li>
              <Link
                to={"/profile"}
                className="btn rounded-full btn-primary text-secondary"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatar;

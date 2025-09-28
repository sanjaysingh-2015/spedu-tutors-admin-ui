import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/SpEduTutorLogo.png";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function NavBar() {
  const token = localStorage.getItem("spedu_token");
  const loggedInUser = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("spedu_token");
    navigate("/login");
  };

  const commonBtn =
    "flex items-center justify-center space-x-2 px-3 py-2 rounded-md font-semibold transition-colors";

  return (
    <div className="card flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard" className="font-bold text-lg">
          <img
            src={logo}
            alt="spEdu Tutors"
            className="h-16 mb-2 mr-4"
          />
        </Link>
        <Link to="/roles" className="text-sm text-gray-600">
          Roles
        </Link>
        <Link to="/users" className="text-sm text-gray-600">
          Users
        </Link>
        <Link to="/levels" className="text-sm text-gray-600">
          Levels
        </Link>
        <Link to="/tutors" className="text-sm text-gray-600">
          Tutors
        </Link>
        <Link to="/students" className="text-sm text-gray-600">
          Students
        </Link>
        <Link to="/fees" className="text-sm text-gray-600">
          Fees
        </Link>
        <Link to="/gamification" className="text-sm text-gray-600">
          Gamification
        </Link>
      </div>

      <div>
        {token ? (
          <div className="flex flex-col items-center space-y-1">
              <span className="font-medium text-gray-700 text-center">
                {loggedInUser}
              </span>
              <button
                onClick={handleLogout}
                className={`${commonBtn} text-red-600 hover:text-red-800`}
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
        ) : (
          <Link
            to="/login"
            className={`${commonBtn} text-blue-600 hover:text-blue-800`}
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}

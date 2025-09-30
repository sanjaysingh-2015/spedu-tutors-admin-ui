import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/SpEduTutorLogo.png";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  Bars3BottomLeftIcon,
  BanknotesIcon,
  TrophyIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  UserIcon
} from "@heroicons/react/24/outline";

export default function NavBar() {
  const token = localStorage.getItem("spedu_token");
  const loggedInUser = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("spedu_token");
    navigate("/login");
  };

  const commonBtn =
    "flex items-center justify-center space-x-2 px-3 py-2 rounded-md font-semibold transition-colors";

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="card flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <Link to={token ? "/dashboard" : "/login"} className="font-bold text-lg">
          <img src={logo} alt="spEdu Tutors" className="h-16 mb-2 mr-4" />
        </Link>

        {/* Hide navigation links on login page */}
        {!isLoginPage && (
          <>
            <Link to="/roles" className="flex flex-col items-center justify-center px-2 text-sm text-gray-600">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>Roles</span>
            </Link>
            <Link to="/users" className="flex flex-col items-center justify-center px-2 text-sm text-gray-600">
              <UserGroupIcon className="w-5 h-5" />
              <span>Users</span>
            </Link>
            <Link to="/levels" className="flex flex-col items-center justify-center px-2 text-sm text-gray-600">
              <Bars3BottomLeftIcon className="w-5 h-5" />
              <span>Levels</span>
            </Link>
            <Link to="/fees" className="flex flex-col items-center justify-center px-2 text-sm text-gray-600">
              <BanknotesIcon className="w-5 h-5" />
              <span>Fees</span>
            </Link>
            <Link to="/gamification" className="flex flex-col items-center justify-center px-2 text-sm text-gray-600">
              <TrophyIcon className="w-5 h-5" />
              <span>Gamification</span>
            </Link>
            <Link to="/tutors" className="flex flex-col items-center justify-center px-2 text-sm text-gray-600">
              <AcademicCapIcon className="w-5 h-5" />
              <span>Tutors</span>
            </Link>
            <Link to="/tutor-fees" className="flex flex-col items-center justify-center px-2 text-sm text-gray-600">
              <CurrencyDollarIcon className="w-5 h-5" />
              <span>Tutor Fees</span>
            </Link>
            <Link to="/students" className="flex flex-col items-center justify-center px-2 text-sm text-gray-600">
              <UserIcon className="w-5 h-5" />
              <span>Students</span>
            </Link>
          </>
        )}
      </div>

      {/* Right side buttons */}
      <div>
        {!isLoginPage && token ? (
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
        ) : !isLoginPage && (
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

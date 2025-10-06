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
  UserIcon,
  Squares2X2Icon,
  ChartBarIcon,
  DocumentTextIcon,
  ClipboardDocumentIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

export default function NavBar() {
  const token = localStorage.getItem("spedu_token");
  const userRole = localStorage.getItem("userRole");
  const loginAt = localStorage.getItem("loginAt");
  const loggedInUser = localStorage.getItem("loggedInUser");
  const initials =
    loggedInUser
      ?.split(" ")
      .map((word) => word[0]?.toUpperCase())
      .slice(0, 2)
      .join("") || "";
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("spedu_token");
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('userRole')
    localStorage.removeItem('loginAt')
    navigate("/login");
  };

  const commonBtn =
    "flex items-center justify-center space-x-2 px-3 py-2 rounded-md font-semibold transition-colors";

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="card flex justify-between items-center">
      {/* Left Section - Logo and Nav Links */}
      <div className="flex items-center space-x-3">
        <Link to={token ? "/dashboard" : "/login"} className="font-bold text-base">
          <img src={logo} alt="spEdu Tutors" className="h-16 mb-1 mr-3" />
        </Link>

        {/* Hide navigation links on login page */}
        {!isLoginPage && (
          <>
            {/* Roles & Users */}
            <div className="px-3 py-3 bg-white border-l border-b border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 shadow-[-3px_3px_5px_rgba(0,0,0,0.1)]">
              <div className="flex space-x-5 justify-center">
                <Link
                  to="/roles"
                  className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600"
                >
                  <ShieldCheckIcon className="w-4 h-4" />
                  <span>Roles</span>
                </Link>
                <Link
                  to="/users"
                  className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600"
                >
                  <UserGroupIcon className="w-4 h-4" />
                  <span>Users</span>
                </Link>
              </div>
            </div>

            {/* Levels, Fees */}
            <div className="px-3 py-3 bg-white border-l border-b border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 shadow-[-3px_3px_5px_rgba(0,0,0,0.1)]">
              <div className="flex space-x-5 justify-center">
                <Link to="/levels" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <Bars3BottomLeftIcon className="w-4 h-4" />
                  <span>Levels</span>
                </Link>
                <Link to="/fees" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <BanknotesIcon className="w-4 h-4" />
                  <span>Fees</span>
                </Link>
              </div>
            </div>

            {/* Documents */}
            <div className="px-3 py-3 bg-white border-l border-b border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 shadow-[-3px_3px_5px_rgba(0,0,0,0.1)]">
              <div className="flex space-x-5 justify-center">
                <Link to="/document-categories" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <ClipboardDocumentIcon className="w-4 h-4" />
                  <span>Doc Cat</span>
                </Link>
                <Link to="/documents" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <DocumentTextIcon className="w-4 h-4" />
                  <span>Document</span>
                </Link>
              </div>
            </div>

            {/* Metrics & Gamification */}
            <div className="px-3 py-3 bg-white border-l border-b border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 shadow-[-3px_3px_5px_rgba(0,0,0,0.1)]">
              <div className="flex space-x-5 justify-center">
                <Link to="/metric-categories" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <Squares2X2Icon className="w-4 h-4" />
                  <span>Metric Cat</span>
                </Link>
                <Link to="/metrics" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <ChartBarIcon className="w-4 h-4" />
                  <span>Metric</span>
                </Link>
                <Link to="/gamification" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <TrophyIcon className="w-4 h-4" />
                  <span>Gamify</span>
                </Link>
              </div>
            </div>

            {/* Tutors */}
            <div className="px-3 py-3 bg-white border-l border-b border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 shadow-[-3px_3px_5px_rgba(0,0,0,0.1)]">
              <div className="flex space-x-5 justify-center">
                <Link to="/tutors" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <AcademicCapIcon className="w-4 h-4" />
                  <span>Tutors</span>
                </Link>
                <Link to="/tutor-fees" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <CurrencyDollarIcon className="w-4 h-4" />
                  <span>Tutor Fees</span>
                </Link>
                <Link to="/tutor-documents" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <DocumentTextIcon className="w-4 h-4" />
                  <span>Document</span>
                </Link>
                <Link to="/tutor-addresses" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <MapPinIcon className="w-4 h-4" />
                  <span>Address</span>
                </Link>
              </div>
            </div>

            {/* Students */}
            <div className="px-3 py-3 bg-white border-l border-b border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 shadow-[-3px_3px_5px_rgba(0,0,0,0.1)]">
              <div className="flex space-x-5 justify-center">
                <Link to="/students" className="flex flex-col items-center justify-center px-1.5 text-xs text-gray-600">
                  <UserIcon className="w-4 h-4" />
                  <span>Students</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right Section - Logout + Profile */}
      <div className="flex items-center space-x-4">
        {/* Profile Info */}
        {!isLoginPage && token ? (
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex flex-col items-center space-y-1 focus:outline-none hover:opacity-80 transition"
          >
            <div className="flex flex-col items-center space-y-0.5">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs">
                {initials}
              </span>
              <span className="text-[0.8rem] text-blue-700 text-center">{loggedInUser}</span>
              <span className="text-[0.65rem] text-orange-800 text-center">As {userRole}</span>
              <span className="text-[0.5rem] text-green-800 text-center">Login: {loginAt}</span>
            </div>
          </button>
        ) : (
          !isLoginPage && (
            <Link
              to="/login"
              className={`${commonBtn} text-blue-600 hover:text-blue-800`}
            >
              <ArrowLeftOnRectangleIcon className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  const sendVerificationOtp = async () =>{
    try{
      axios.defaults.withCredentials = true;

      const {data} = await axios.post(backendUrl + "/api/auth/send-verify-otp")

      if(data.success){
        navigate('/email-verify')
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }

    }catch(error){
      toast.error(error.message);
    }
  }

  const logout = async ()=>
    {
      try {
        axios.defaults.withCredentials = true
        const {data} = await axios.post(backendUrl + '/api/auth/logout')

        data.success && setIsLoggedin(false)
        data.success && setUserData(false)
        navigate('/')
      } catch (error) {
        toast.error(error)
      }
    }
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);
  return (
    <div className="w-full flex items-center justify-between p-4 sm:p-6 sm:px-24 absolute top-0 bg-F7EDF0">
  {/* Left: Logo */}
  <img
    src={assets.logo_cap}
    alt="Logo"
    className="w-50 h-16 flex justify-center items-center rounded-sm"
  />

  {/* Show Navigation Links Only If Logged In */}
  {userData && (
    <div className="flex-grow flex justify-center">
      <ul className="flex font-semibold text-gray-500">
        <li
          className={`md:px-4 md:py-2 cursor-pointer ${
            location.pathname === "/" ? "text-[#2a4192]" : "hover:text-[#f9d4d2]"
          }`}
          onClick={() => navigate("/")}
        >
          About
        </li>
        <li
          className={`md:px-4 md:py-2 cursor-pointer ${
            location.pathname === "/pixel-game" ?"text-[#2a4192]" : "hover:text-[#f9d4d2]"
          }`}
          onClick={() => navigate("/pixel-game")}
        >
          Pixel Art
        </li>
        <li
          className={`md:px-4 md:py-2 cursor-pointer ${
            location.pathname === "/journal" ?"text-[#2a4192]" : "hover:text-[#f9d4d2]"
          }`}
          onClick={() => navigate("/journal")}
        >
          Journal
        </li>
        <li
          className={`md:px-4 md:py-2 cursor-pointer ${
            location.pathname === "/bingo-game" ?"text-[#2a4192]" : "hover:text-[#f9d4d2]"
          }`}
          onClick={() => navigate("/bingo-game")}
        >
          Bingo
        </li>
        <li
          className={`md:px-4 md:py-2 cursor-pointer ${
            location.pathname === "/break-timer-quest" ?"text-[#2a4192]" : "hover:text-[#f9d4d2]"
          }`}
          onClick={() => navigate("/break-timer-quest")}
        >
          Break Timer Quest
        </li>
        <li
        className={`md:px-4 md:py-2 cursor-pointer ${
          location.pathname === "/todo-list" ?"text-[#2a4192]" : "hover:text-[#f9d4d2]"
        }`}
        onClick={() => navigate("/todo-list")}
      >
        Task Manager
      </li>
      </ul>
    </div>
  )}

  {/* Right: Profile Dropdown */}
  {userData ? (
    <div className="relative group">
      <div className="w-10 h-10 flex justify-center items-center rounded-full bg-[#2a4192] text-white cursor-pointer">
        {userData.name[0].toUpperCase()}
      </div>

      {/* Dropdown */}
      <div
        className="absolute hidden group-hover:block right-0 mt-2 w-48  divide-y  rounded-lg shadow-lg bg-[#2a4192] divide-[#F7EDF0]"
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <p className="font-semibold">{userData.name}</p>
          <p className="text-gray-500 truncate">
            {userData.email}
          </p>
        </div>
        <ul className="py-2">
          {!userData.isAccountVerified && (
            <li>
              <button
                onClick={sendVerificationOtp}
                className="block w-full text-left px-4 py-2 text-sm text-[#F7EDF0] hover:bg-[#4b5b96]"
              >
                Verify Email
              </button>
            </li>
          )}
          <li>
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-sm text-[#F7EDF0] hover:bg-[#4b5b96] "
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <button
      onClick={() => navigate("/login")}
      className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
    >
      Login <img src={assets.arrow_icon} alt="" />
    </button>
  )}
</div>

  );
};

export default Navbar;

import React from "react";
import { IoLogOut } from "react-icons/io5";
import useAuth from "../../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <div className="border-r h-full flex flex-col items-center justify-between py-5 px-2">
      <div>
        <img src="/logos/logo-white.png" className="max-w-full" alt="" />
      </div>
      <div className="pb-10">
        <IoLogOut
          className="text-2xl hover:text-gray-300 transition-all duration-300 cursor-pointer"
          title="logout"
          onClick={logout}
        />
      </div>
    </div>
  );
}

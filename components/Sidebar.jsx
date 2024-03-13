import React, { useEffect, useState } from "react";
import { RiChatNewFill } from "react-icons/ri";
import { GrUpgrade } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { RiSettings3Fill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";

import PlanModal from "./PlanModal";
import useAuth from "../context/AuthContext";
import SettingsModal from "./SettingsModal";

export default function Sidebar({ startNewChat, restoreChat, refrehHistory }) {
  const [history, setHistory] = useState([]);
  const [openPlans, setOpenPlans] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const prev = localStorage.getItem("conversationHistory");
    if (prev) {
      setHistory(JSON.parse(prev));
    }
  }, [refrehHistory]);

  return (
    <div className="flex flex-col px-3 py-3 text-white gap-10 h-full">
      <AnimatePresence>
        {openPlans && <PlanModal toggle={() => setOpenPlans((p) => !p)} />}
      </AnimatePresence>
      <AnimatePresence>
        {settingsOpen && (
          <SettingsModal toggle={() => setSettingsOpen((p) => !p)} />
        )}
      </AnimatePresence>
      <header className="flex justify-end items-center relative top-5 pb-10">
        <div className="w-32 absolute left-0">
          <img
            src="/logos/logo-white.png"
            className="max-w-full object-contain"
            alt=""
          />
        </div>
        <button
          onClick={startNewChat}
          className="flex items-center justify-center p-2 rounded-full hover:bg-white/90 transition-all group"
        >
          <RiChatNewFill
            className="text-2xl group-hover:text-primary2 transition-all"
            title="New Chat"
          />
        </button>
      </header>
      <main
        className="flex flex-col gap-2 flex-1 overflow-auto"
        id="history-scroll"
      >
        <div className="font-bold text-sm border-b pb-2 pr-3 border-b-primary flex justify-between items-center">
          History{" "}
          {history.length > 0 && (
            <span
              className="hover:bg-red-500 transition-all p-1.5 rounded-full"
              title="clear history"
              onClick={() => {
                localStorage.removeItem("conversationHistory");
                setHistory([]);
              }}
            >
              <MdOutlineClear />
            </span>
          )}
        </div>
        {history.length > 0 ? (
          history.map((el, i) => {
            return (
              <div
                onClick={() => restoreChat(el)}
                key={i}
                className="text-sm text-neutral-300 font-bold cursor-pointer hover:bg-neutral-700 hover:text-white transition-all rounded-lg p-2"
              >
                {i + 1 + "-" + el.history[0][0]}
              </div>
            );
          })
        ) : (
          <span className="text-sm text-neutral-500 font-primaryMedium">
            No previous history
          </span>
        )}
      </main>
      <div className="flex flex-col gap-2 py-5">
        <div
          onClick={() => setOpenPlans((p) => !p)}
          className="flex items-center gap-2 font-primaryLight  hover:bg-primary2 p-2 rounded-lg shadow-sm cursor-pointer bg-neutral-800 font-semibold transition-all"
        >
          <GrUpgrade />
          Upgrade Plan
        </div>
        <div
          onMouseLeave={() =>
            setTimeout(() => {
              setProfileOpen(false);
            }, 3000)
          }
          onClick={() => setProfileOpen((p) => !p)}
          className="flex items-center gap-2 relative bg-neutral-800 p-2 rounded-lg shadow-sm cursor-pointer hover:bg-primary2 font-semibold transition-all"
        >
          <AnimatePresence>
            {profileOpen && (
              <ProfileTab openSettings={() => setSettingsOpen((p) => !p)} />
            )}
          </AnimatePresence>
          <FaRegUserCircle />
          Profile
        </div>
      </div>
    </div>
  );
}

const ProfileTab = ({ openSettings }) => {
  const { logout } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      className="absolute bottom-[110%] left-0 rounded-xl bg-neutral-800 w-full  p-5 flex flex-col gap-4"
    >
      <div
        onClick={openSettings}
        className="flex items-center gap-2  font-primaryLight hover:bg-neutral-600 transition-all duration-300 p-2 rounded-xl"
      >
        <RiSettings3Fill className="text-2xl" />
        Settings
      </div>
      <div
        onClick={logout}
        className="flex items-center gap-2  font-primaryLight hover:bg-neutral-600 transition-all duration-300 p-2 rounded-xl"
      >
        <IoLogOut className="text-2xl" />
        Logout
      </div>
    </motion.div>
  );
};

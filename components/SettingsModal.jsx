import React from "react";
import { motion } from "framer-motion";
import { MdOutlineClear } from "react-icons/md";

export default function SettingsModal({ toggle }) {
  return (
    <motion.div
      onClick={toggle}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      className="w-screen h-screen top-0 left-0 backdrop-blur-sm fixed z-[999999] flex justify-center items-center bg-primary/10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl min-h-[70vh] bg-neutral-900 border-2 border-primary2 rounded-xl shadow-lg"
      >
        <h1 className="py-5 border-primary2 border-b px-5 flex items-center justify-between font-primaryBold text-2xl">
          Settings
          <span
            onClick={toggle}
            className="cursor-pointer p-2 rounded-full hover:bg-white hover:text-primary transition-all duration-300"
          >
            <MdOutlineClear />
          </span>
        </h1>
        <main className="flex flex-col gap-5 divide-primary">
          <div className="flex items-center justify-between w-full px-10 pt-5">
            <span className="font-medium">Multi-Factor Authentication</span>
            <button className="bg-primary text-white text-xs p-2 font-primaryMedium rounded">
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between w-full px-10 pt-5">
            <span className="font-medium">Archive Chats</span>
            <button className="bg-primary text-white text-xs p-2 font-primaryMedium rounded">
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between w-full px-10 pt-5">
            <span className="font-medium">Archive All Chats</span>
            <button className="bg-primary text-white text-xs p-2 font-primaryMedium rounded">
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between w-full px-10 pt-5">
            <span className="font-medium">Delete All Chats</span>
            <button className="bg-red-500 text-white text-xs p-2 font-primaryMedium rounded">
              Delete
            </button>
          </div>
        </main>
      </div>
    </motion.div>
  );
}

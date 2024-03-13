import Link from "next/link";
import React, { useState } from "react";
import useAuth from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (username === "admin" && pass === "1234") {
      login();
    } else {
      toast.error("Invaid usename or Password");
    }
  }
  return (
    <div className="bg-neutral-800 flex justify-center overflow-hidden items-center text-white flex-col gap-10 h-screen p-5">
      <div className="max-w-md">
        <img
          src="/logos/logo-white.png"
          className="max-w-[200px] object-contain"
          alt=""
        />
      </div>
      <motion.form
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.2, type: "spring" },
        }}
        onSubmit={handleSubmit}
        className="bg-neutral-700 border-2 text-black border-primary2 rounded-xl flex flex-col p-5 w-full max-w-lg gap-5 min-h-[25rem]"
      >
        <h1 className="text-white font-primaryBold text-center text-2xl">
          Login
        </h1>
        <label className="text-white text-lg " htmlFor="">
          Username
        </label>
        <input
          className="rounded-lg p-4 bg-neutral-100 outline-none shadow-md"
          type="text"
          required
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-white text-lg " htmlFor="">
          Password
        </label>
        <input
          placeholder="password"
          required
          className="rounded-lg p-4 bg-neutral-100 outline-none shadow-md"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="w-full p-4 rounded-xl bg-primary text-xl text-white shadow-md font-primaryMedium hover:bg-primary2 transition-all duration-300">
          Login
        </button>
        <p className="text-white">
          Don't have an account?{" "}
          <Link
            className="text-primary font-primaryBold underline"
            href={"/auth/signup"}
          >
            Signup
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

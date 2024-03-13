"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import MessageArea from "../components/MessageArea";
import LoadingDots from "../components/ui/LoadingDots";
import { RiChatNewFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { IoLogOut } from "react-icons/io5";
import Layout from "../components/layout";
import useAuth from "../context/AuthContext";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [lastQuery, setLastQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [restored, setRestored] = useState(false);
  const [refrehHistory, setRefreshHistory] = useState(false);
  const [chatError, setChatError] = useState({
    status: false,
    text: "Error generating response",
  });

  function startNewChat() {
    if (chatHistory.length === 0 || history.length === 0) return;
    setHistory([]);
    setChatHistory([]);
    const prev = localStorage.getItem("conversationHistory");

    if (!restored) {
      if (prev) {
        const conv = JSON.parse(prev);
        localStorage.setItem(
          "conversationHistory",
          JSON.stringify([...conv, { chat: chatHistory, history }])
        );
      } else {
        localStorage.setItem(
          "conversationHistory",
          JSON.stringify([{ chat: chatHistory, history }])
        );
      }
      localStorage.removeItem("chat");
      localStorage.removeItem("history");
      setRefreshHistory((p) => !p);
    }
  }

  function restoreHistory(el) {
    setHistory(el.history);
    setChatHistory(el.chat);
    setRestored(true);
  }

  // useEffect(() => {
  //   setHistory(JSON.parse(localStorage.getItem("history")) || []);
  //   setChatHistory(JSON.parse(localStorage.getItem("chat")) || []);
  // }, []);

  // useEffect(() => {
  //   if (chatHistory.length) {
  //     localStorage.setItem("chat", JSON.stringify(chatHistory));
  //   }
  //   if (history.length) {
  //     localStorage.setItem("history", JSON.stringify(history));
  //   }
  // }, [chatHistory, history]);

  async function handelSubmit(e) {
    e.preventDefault();
    setRestored(false);
    setLastQuery(query.trim());
    const question = query.trim();
    setChatHistory((p) => [...p, { from: "self", text: question }]);
    setQuery("");

    try {
      setLoading(true);
      setChatError((p) => ({ ...p, status: false }));
      const res = await axios.post("/api/chat", { question, history });
      setHistory((p) => [...p, [question, res.data.text]]);
      setChatHistory((p) => [...p, { from: "api", text: res.data.text }]);
      //   console.log(res.data.text);
    } catch (error) {
      console.log(error);
      setChatError((p) => ({ ...p, status: true }));
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && query.trim()) {
      handelSubmit(e);
    } else if (e.key == "Enter") {
      e.preventDefault();
    }
  }

  async function regenerate() {
    setRestored(false);
    const question = chatHistory[chatHistory.length - 1].text;
    // setChatHistory((p) => [...p, { from: "self", text: question }]);
    setQuery("");

    try {
      setLoading(true);
      setChatError((p) => ({ ...p, status: false }));
      const res = await axios.post("/api/chat", { question, history });
      setHistory((p) => [...p, [question, res.data.text]]);
      setChatHistory((p) => [...p, { from: "api", text: res.data.text }]);
      //   console.log(res.data.text);
    } catch (error) {
      console.log(error);
      setChatError((p) => ({ ...p, status: true }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <main className="h-screen overflow-hidden bg-neutral-800 w-full flex font-primaryLight">
        <motion.div
          initial={{ translateX: "-100%" }}
          animate={{
            translateX: "0",
            transition: { delay: 0.5, duration: 0.5 },
          }}
          className="md:flex hidden flex-col w-[350px] bg-neutral-900"
        >
          <Sidebar
            startNewChat={startNewChat}
            restoreChat={restoreHistory}
            refrehHistory={refrehHistory}
          />
        </motion.div>
        <div className="w-full h-full  flex flex-col gap-5 items-center justify-between py-10 px-5">
          <Selection startNewChat={startNewChat} />
          {chatHistory.length === 0 ? (
            <Branding />
          ) : (
            <div className="flex justify-center items-center">
              <img src="/logos/logo-white.png" className="w-24" alt="" />
            </div>
          )}
          {chatHistory.length > 0 && (
            <MessageArea
              chatHistory={chatHistory}
              error={chatError}
              loading={loading}
              regenerate={regenerate}
            />
          )}

          <motion.form
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.25 } }}
            className="flex bg-neutral-200 p-2 rounded-lg shadow-[0_0_10px] max-w-4xl w-full shadow-primary"
            onSubmit={handelSubmit}
          >
            <textarea
              type="text"
              disabled={loading}
              onKeyDown={handleKeyDown}
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 rounded border-none outline-none bg-transparent"
              placeholder="Type something..."
            />
            <button
              type="submit"
              disabled={loading}
              className="pr-4 text-3xl flex justify-center items-center text-neutral-800 disabled:text-gray-600 hover:text-primary2 transition-all duration-300"
            >
              {loading ? <LoadingDots /> : <IoMdSend className="" />}
            </button>
          </motion.form>
        </div>
      </main>
    </Layout>
  );
}

const Selection = ({ startNewChat }) => {
  const { logout } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3 }}
      className="w-full px-2 flex justify-between"
    >
      <select className="p-1 rounded bg-neutral-700 border-2 border-primary shadow-md  text-white outline-none w-24 text-center">
        <option>GTP-3.5</option>
        <option>GTP-4</option>
      </select>
      <div className="flex items-center gap-2">
        <button
          onClick={startNewChat}
          className="flex items-center justify-center p-2 text-white rounded-full hover:bg-white/90 transition-all group"
        >
          <RiChatNewFill
            className="text-2xl text-white md:hidden group-hover:text-primary2 transition-all"
            title="New Chat"
          />
        </button>
        <button
          onClick={logout}
          className="flex items-center justify-center p-2 rounded-full hover:bg-white/90 transition-all group"
        >
          <IoLogOut
            className="text-2xl text-white md:hidden group-hover:text-primary2 transition-all"
            title="Logout"
          />
        </button>
      </div>
    </motion.div>
  );
};

const Branding = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1, delay: 1 } }}
      className="flex w-full h-full flex-col gap-6 items-center justify-center flex-1"
    >
      <img src="/logos/logo-white.png" className="w-56" alt="" />
      <p className="font-semibold text-primary text-2xl">
        How can I help you today?
      </p>
    </motion.div>
  );
};

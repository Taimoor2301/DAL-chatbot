import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import LoadingDots from "./ui/LoadingDots";
import { VscDebugRestart } from "react-icons/vsc";
import { MdContentCopy } from "react-icons/md";

export default function MessageArea(props) {
  const {
    chatHistory,
    error,
    loading,
    regenerate,
    setChatHistory,
    newMessage,
    setNewMessage,
  } = props;

  const [isTyping, setIsTyping] = useState(false);
  const messageContainer = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }, [newMessage]);

  useEffect(() => {
    if (newMessage?.text) {
      setIsTyping(true);
      let index = 0;
      const typingTimer = setInterval(() => {
        setText((prevText) => prevText + newMessage.text[index]);
        index++;
        if (index >= newMessage.text.length) {
          setIsTyping(false);
          clearInterval(typingTimer);
          setChatHistory((p) => [...p, newMessage]);
          setNewMessage("");
          setText("");
        }
      }, 50); // Adjust the typing speed here (e.g., 100ms)

      return () => clearInterval(typingTimer);
    }
  }, [newMessage]);

  return (
    <main
      className="flex flex-col pr-4 py-4 w-full max-w-4xl flex-1 overflow-y-auto text-white font-medium"
      id="message-area"
      ref={messageContainer}
    >
      {chatHistory.length > 0 &&
        chatHistory.map((message, index) => {
          const fromApi = message.from === "api";
          return (
            <div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1, delay: 0.1 } }}
              key={index}
            >
              <div key={index} className={`py-2 flex gap-2`}>
                <div className="flex justify-start w-12 items-start pt-1">
                  {fromApi ? (
                    <img
                      src="/logos/logo-white.png"
                      className="w-10"
                      alt="Dal"
                    />
                  ) : (
                    <FaRegUserCircle className="text-lg text-primary2" />
                  )}
                </div>{" "}
                <p className="flex-1">{message.text}</p>
              </div>
              {index === chatHistory.length - 1 && fromApi && !loading && (
                <div className="pr-14 flex gap-2">
                  <span
                    onClick={regenerate}
                    title="Regenarate"
                    className="bg-neutral-600 hover:bg-neutral-700 transition-all cursor-pointer p-1 rounded-md"
                  >
                    <VscDebugRestart />
                  </span>
                  <span
                    title="Copy"
                    onClick={() =>
                      window.navigator.clipboard.writeText(message.text)
                    }
                    className="bg-neutral-600 hover:bg-neutral-700 transition-all cursor-pointer p-1 rounded-md"
                  >
                    <MdContentCopy />
                  </span>
                </div>
              )}
            </div>
          );
        })}
      {error.status && (
        <>
          <div className={`py-2 flex gap-2`}>
            <div className="flex justify-start w-12 items-center">
              <img src="/logos/logo-white.png" className="w-10" alt="Dal" />
            </div>
            <p className="flex-1 font-mono font-medium text-red-500">
              {error.text}
            </p>
          </div>
          <div className="pr-14 flex gap-2">
            <span
              onClick={regenerate}
              title="Regenarate"
              className="bg-neutral-600 hover:bg-neutral-700 transition-all cursor-pointer p-1 rounded-md"
            >
              <VscDebugRestart />
            </span>
          </div>
        </>
      )}
      {loading && (
        <div className={`py-2 flex gap-2`}>
          <div className="flex justify-start w-12 items-center">
            <img src="/logos/logo-white.png" className="w-10" alt="Dal" />
          </div>
          <p className="flex-1 font-mono font-medium">
            <LoadingDots color="#fff" />
          </p>
        </div>
      )}
      {text && (
        <div className="py-2 flex gap-2">
          <div className="flex justify-start w-12 items-start pt-1">
            <img src="/logos/logo-white.png" className="w-10" alt="Dal" />
          </div>
          <p className="flex-1">
            {newMessage.text[0]}
            {text} <span className="text-white blinking-text"> | </span>
          </p>
        </div>
      )}
    </main>
  );
}

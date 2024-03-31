import React, { useEffect, useRef, useState } from "react";
import { SlReload } from "react-icons/sl";
import { TfiReload } from "react-icons/tfi";
import { LuSendHorizonal } from "react-icons/lu";

export default function Center() {
  const [text, setText] = useState("");

  const textArea = useRef(null);

  useEffect(() => {
    if (textArea.current) {
      textArea.current.style.height = "auto";
      textArea.current.style.height = `${textArea.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="h-full flex flex-col pb-10 p-5 gap-6">
      <div className="flex-1 overflow-auto max-h-[75vh] border rounded-xl p-5">
        <textarea
          ref={textArea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="enter you text"
          className="w-full outline-none resize-none text-white bg-transparent"
        ></textarea>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-white bg-green-500/80 py-1.5 px-5 rounded shadow font-medium hover:bg-green-500 transition-all duration-300 flex justify-center items-center gap-2 group">
          Submit
          <LuSendHorizonal className="" />
        </button>
        <span className="bg-gray-200 text-black cursor-pointer hover:bg-gray-400 transition-all duration-300 p-2 rounded">
          <SlReload title="reload" />
        </span>
        <span className="bg-gray-200 text-black cursor-pointer hover:bg-gray-400 transition-all duration-300 p-2 rounded">
          <TfiReload title="reset" />
        </span>
      </div>
    </div>
  );
}

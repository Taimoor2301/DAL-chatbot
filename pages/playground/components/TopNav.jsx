import React from "react";

export default function TopNav() {
  return (
    <div className="p-3 border-b flex justify-between">
      <section className="flex gap-3 items-center">
        <h2 className="font-bold">Playground</h2>
        <select className="border rounded-md border-gray-300 px-2 py-1 text-xs outline-none bg-transparent">
          <option>Complete</option>
        </select>
      </section>
      <section className="flex gap-3">
        <select className="border rounded-md border-gray-300 px-2 py-1 text-xs outline-none w-[200px] bg-transparent">
          <option>Your preset</option>
        </select>
        <Button text="Save" />
        <Button text="View code" />
        <Button text="Share" />
      </section>
    </div>
  );
}

const Button = ({ text }) => {
  return (
    <button className="text-gray-900 min-w-max font-semibold px-2 py-0.5 text-xs rounded bg-gray-200 hover:bg-gray-300 transition-all duration-300">
      {text}
    </button>
  );
};

import React, { useState } from "react";

export default function Controller({
  temp,
  setTemp,
  maxLen,
  setMaxLen,
  topP,
  setTopP,
  freq,
  setFreq,
  pres,
  setPres,
  bestOf,
  setBestOf,
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold">Model</span>
      <select className="border border-gray-300 rounded-lg px-2 py-1 bg-transparent">
        <option className="text-black">gtp-3.5-turbo</option>
        <option className="text-black">gtp-4</option>
      </select>

      <div className="flex flex-col gap-5">
        <Range
          title={"Temperature"}
          min={0}
          max={1}
          value={temp}
          step={0.1}
          handleChange={(e) => setTemp(e.target.value)}
        />
        <Range
          title={"Maximum length"}
          min={200}
          max={1000}
          value={maxLen}
          handleChange={(e) => setMaxLen(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Prompt</span>
          <textarea
            className="outline-none border border-gray-300 rounded bg-transparent"
            cols="30"
            rows="4"
          ></textarea>
        </div>
        <Range
          title={"Top P"}
          min={0}
          max={1}
          step={0.1}
          value={topP}
          handleChange={(e) => setTopP(e.target.value)}
        />
        <Range
          title={"Frequency penalty"}
          min={0}
          max={1}
          step={0.1}
          value={freq}
          handleChange={(e) => setFreq(e.target.value)}
        />
        <Range
          title={"Presence penalty"}
          min={0}
          max={1}
          step={0.1}
          value={pres}
          handleChange={(e) => setPres(e.target.value)}
        />
        <Range
          title={"Best of"}
          min={0}
          max={1}
          step={0.1}
          value={bestOf}
          handleChange={(e) => setBestOf(e.target.value)}
        />

        <div className="flex items-center">
          <input
            id="start-text"
            type="checkbox"
            value=""
            className="w-4 h-4 accent-gray-600 rounded"
          />
          <label
            htmlFor="start-text"
            className="ms-2 text-sm font-medium cursor-pointer dark:text-gray-300"
          >
            Inject start text
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="restart-text"
            type="checkbox"
            value=""
            className="w-4 h-4 accent-gray-600 rounded"
          />
          <label
            htmlFor="restart-text"
            className="ms-2 text-sm font-medium cursor-pointer dark:text-gray-300"
          >
            Inject restart text
          </label>
        </div>

        <select className="border border-gray-300 rounded outline-none px-2 py-1 bg-transparent">
          <option className="text-black">show probabilities</option>
          <option className="text-black">yes</option>
          <option className="text-black">no</option>
        </select>
      </div>
    </div>
  );
}

const Range = ({ min, max, title, step, value, handleChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between font-semibold text-sm">
        <span>{title}</span>
        <span>{value}</span>
      </div>
      <input
        type="range"
        className="custom-range"
        min={min}
        max={max}
        step={step || 1}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

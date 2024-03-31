import React, { useState } from "react";
import Layout from "../../components/layout";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import Center from "./components/Center";
import Controller from "./components/Controller";

export default function Playground() {
  const [temp, setTemp] = useState(0.2);
  const [maxLen, setMaxLen] = useState(350);
  const [topP, setTopP] = useState(0.3);
  const [freq, setFreq] = useState(0.5);
  const [pres, setPres] = useState(0.4);
  const [bestOf, setBestOf] = useState(0.5);

  return (
    <Layout>
      <div className="h-screen flex w-full bg-neutral-800 text-white" dir="ltr">
        <div className="w-12  overflow-hidden h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <TopNav />
          <section className="grid grid-cols-12 flex-1">
            <div className="col-span-9">
              <Center />
            </div>
            <div className="col-span-3 px-4 pt-2">
              <Controller
                temp={temp}
                setTemp={setTemp}
                maxLen={maxLen}
                setMaxLen={setMaxLen}
                topP={topP}
                setTopP={setTopP}
                freq={freq}
                setFreq={setFreq}
                pres={pres}
                setPres={setPres}
                bestOf={bestOf}
                setBestOf={setBestOf}
              />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

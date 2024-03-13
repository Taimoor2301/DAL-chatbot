import React from "react";
import { motion } from "framer-motion";
import { MdOutlineClear } from "react-icons/md";

export default function PlanModal({ toggle }) {
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
          Upgrade your Plan
          <span
            onClick={toggle}
            className="cursor-pointer p-2 rounded-full hover:bg-white hover:text-primary transition-all duration-300"
          >
            <MdOutlineClear />
          </span>
        </h1>
        <main className="grid grid-cols-3 gap-5 divide-x divide-primary">
          {plansData.map((plan, index) => {
            return (
              <div key={index} className="flex flex-col gap-2 p-3">
                <section className="py-3">
                  <h1 className="text-2xl pt-2 pb-2 font-primaryMedium">
                    {plan.name}
                  </h1>
                  <p className="font-primaryBold text-gray-300">{plan.price}</p>
                </section>
                <button
                  disabled={index === 0}
                  className="bg-primary my-5 hover:bg-primary2 transition-all duration-300 text-white p-3 rounded-xl shadow font-primaryMedium disabled:bg-gray-500"
                >
                  {index === 0 ? "Your Current Plan" : "Upgrade"}
                </button>
                <section className="flex flex-col gap-2">
                  <p className="text-white font-primaryMedium text-sm">
                    {plan.tagLine}
                  </p>
                  <ul className="flex flex-col gap-1 list-disc pl-5 text-sm font-primaryLight">
                    {plan.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </section>
              </div>
            );
          })}
        </main>
      </div>
    </motion.div>
  );
}

const plansData = [
  {
    name: "Free",
    price: "USD $0/month",
    tagLine: "For people just getting started with ChatGPT",
    points: [
      "Unlimited messages, interactions, and history",
      "Access to our GPT-3.5 model",
      "Access on Web, iOS, and Android",
    ],
  },
  {
    name: "Plus",
    price: "USD $20/month",
    tagLine: "Everything in Free, and:",
    points: [
      "Access to GPT-4, our most capable model",
      "Browse, create, and use GPTs",
      "Access to additional tools like DALL·E, Browsing, Advanced Data Analysis and more",
    ],
  },
  {
    name: "Team",
    price: "USD $25/month",
    tagLine: "Everything in Plus, and:",
    points: [
      "Higher message caps on GPT-4 and tools like DALL·E, Browsing, Advanced Data Analysis, and more",
      "Create and share GPTs with your workspace",
      "Admin console for workspace management",
    ],
  },
];

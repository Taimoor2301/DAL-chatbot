/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#30667c",
        primary2: "#275d6d",
      },
      fontFamily: {
        primaryBold: ["gotham-bold"],
        primaryMedium: ["gotham-medium"],
        primaryLight: ["gotham-light"],
      },
    },
  },
};

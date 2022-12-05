/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray150: "#ebebeb",
        red150: "#fd0000",
      },
    },
  },
  plugins: [require("daisyui")],
};

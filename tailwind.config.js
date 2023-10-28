/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        IBM: ['IBM Plex Sans Thai', 'sans-serif'],
      },
    },
  },
  daisyui: {
     themes: [
       {
         mytheme: { "primary": "#e11d48" },
       },
     ],
   },
  plugins: [require("daisyui")],
}


module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // ✅ DaisyUI লোড করার সঠিক জায়গা
  plugins: [require("daisyui")], 
  daisyui: {
    themes: ["light", "dark"], 
  },
};
module.exports = {
  mode: "jit",
  // purge: 余計なものを排除するという意味 > 使っていない CSS を削除してくれる
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      lineClamp: {
        7: "7",
      },
    },
  },
  variants: {
    extend: {},
    visibility: ["group-hover"],
    // display: ["group-hover"],
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

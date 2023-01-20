/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#111731",
        greens: {
          DEFAULT: "#7ee787",
          second: "#aff5b4",
          third: "#30a14e",
        },
        grays: {
          DEFAULT: "#161b22",
          second: "#c9d1d9",
        },
        reds: {
          DEFAULT: "#ffa28b",
          second: "#ffc2b2",
        },
        purples: {
          DEFAULT: "#939aff",
          second: "#abb4ff",
        },
        blacks: {
          DEFAULT: "#040D21",
        },
        test: "var(--color-test)",
        test1: "var(--color-test1)",
      },
    },
  },
  plugins: [],
};

/*

  purple  background: linear-gradient(180deg, rgba(183, 52, 179, 0.15) 0%, rgba(164, 46, 156, 0) 100%),#6e40c9 !important;
}
 */

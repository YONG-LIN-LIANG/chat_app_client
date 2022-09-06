/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        gray: {
          1: "#333333",
          2: "#4f4f4f",
          3: "#828282",
          4: "#bdbdbd",
          5: "#e0e0e0",
          6: "#f2f2f2",
          7: "#FCFCFC",
        },
        green: {
          DEFAULT: "#bbdc75",
          w20: "#f1f8e3",
          w50: "#ddedba",
          b50: "#5d6e3a",
          b70: "#384223",
          neon: "#e3ff39",
        },
        orange: {
          DEFAULT: "#faa677",
          w20: "#feede4",
          b90: "#e1956b",
        },
        red: "#ff483d",
        purple: "#706e85",
        white: {
          DEFAULT: "#ffffff",
          w50: "rgba(255, 255, 255, 0.5)",
        },
      },
      fontSize: {
        md: "15px",
      },
      borderRadius: {
        3: "3px",
        10: "10px",
        20: "20px",
      },
      boxShadow: {
        underLine: "0px 1px 0px rgba(0, 0, 0, 0.05)",
        layer1: "4px 0px 6px rgba(0, 0, 0, 0.1)",
        layer2: "0px 4px 5px rgba(0, 0, 0, 0.07)",
        layer3: "0px 3px 3px rgba(0, 0, 0, 0.03)",
        layer3Re: "0px -3px 3px rgba(0, 0, 0, 0.03)",
        input: "inset 0px 0px 10px rgba(0, 0, 0, 0.05)",
      },
      translate: {
        "1/2Re": "-50%",
      },
      width: {
        4.5: "18px",
        7.5: "30px",
        15: "60px",
        35: "140px",
        62: "248px",
        66: "264px",
        85: "340px",
        100: "400px",
      },
      minWidth: {
        3: "12px",
        4.5: "18px",
        14: "56px",
        16: "64px",
        20: "80px",
        48: "192px",
        66: "264px",
        85: "340px",
      },
      maxWidth: {
        20: "80px",
        29: "116px",
        55: "220px",
        56: "224px",
        66: "264px",
      },
      height: {
        4.5: "18px",
        7.5: "30px",
        15: "60px",
        105: "420px",
        141: "564px",
        165: "660px",
      },
      maxHeight: {
        141: "564px",
      },
      spacing: {
        7.5: "30px",
        22: "88px",
      },
      zIndex: {
        9999: "9999",
      },
      transitionDelay: {
        0: "0ms",
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    screens: {
      xxl: { max: "1919px" },
      // => @media (max-width: 1919px) { ... }
      // 1440-1919
      xl: { max: "1439px" },
      // => @media (max-width: 1439px) { ... }
      // 1024-1439
      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }
      // 768-1024
      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }
      // 640-767
      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      // 425-639(767)
      xs: { max: "424px" },
      // => @media (max-width: 424px) { ... }
      // 375-424
      xxs: { max: "374px" },
      // => @media (max-width: 374px) { ... }
    },
    lineHeight: {
      12: "3rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

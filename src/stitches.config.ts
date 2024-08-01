import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: "#0070f3",
      secondary: "#1A1A1A",
      background: "#f0f0f0", // Novo tom neutro
      text: "#2C3E50", // Cor de texto mais escura para contraste
    },
  },
});

const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  body: {
    fontFamily: "'Poppins', sans-serif", 
    backgroundColor: `$background`,
    color: "$text",
    lineHeight: 1.5,
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
  "html, body, #root": {
    height: "100%",
  },
});

globalStyles();

import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  body: {
    fontFamily: "'Poppins', sans-serif", // Aplicando a fonte Poppins como padrão
    backgroundColor: "#2C3E50", // Ajustado para um tom mais escuro para combinar com o menu
    color: "#ECF0F1", // Texto claro para contraste
    lineHeight: 1.5,
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  h1: {
    fontFamily: "'Lato', sans-serif", // Aplicando a fonte Lato para os títulos
  },
  "html, body, #root": {
    height: "100%",
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
});

globalStyles();

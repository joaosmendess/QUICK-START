import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
  body: {
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#f4f6f8",
    color: "#000000",
    lineHeight: 1.5,
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  "html, body, #root": {
    height: "100%",
  },
  // Estilos globais para o contêiner dos formulários
  ".form-container": {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    gap: '16px',
    maxWidth: '600px',
    margin: 'auto',
    '@media (max-width: 600px)': {
      padding: '16px',
    },
  },
});

globalStyles();

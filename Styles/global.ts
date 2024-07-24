import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box",  },
  body: {
    fontFamily: "Roboto, sans-serif",
    background: "#f5f5f5 ",
    
    color: "#000000",
    lineHeight: 1.5,
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    zIndex:2
  },
  "html, body, #root": {
    height: "100%",
    
   
  },
  ".form-button": {
   
    display: "flex",
    justifyContent: "flex-end", // Alinha o botão à direita


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

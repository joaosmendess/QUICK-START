import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import App from './App';
import theme from './Styles/theme'; // Importe o tema configurado

const globalStyles = (
  <GlobalStyles
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      body: {
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: '#f0f0f0',
        color: '#ECF0F1',
        lineHeight: 1.5,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      h1: {
        fontFamily: "'Lato', sans-serif",
      },
      'html, body, #root': {
        height: '100%',
      },
      a: {
        color: 'inherit',
        textDecoration: 'none',
      },
    }}
  />
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reseta os estilos padrão do navegador */}
      {globalStyles}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

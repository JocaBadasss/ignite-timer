import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default.ts';
import { GlobalStyle } from './styles/global.ts';
import { Router } from './Router/index.tsx';
import { CyclesContextProvider } from './contexts/CyclesContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';
import { InvoiceProvider } from './context/InvoiceData';

const theme = createTheme({
  palette : {
    primary : {
      main : '#2e2532'
    },
    secondary : {
      main : '#201a23'
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <InvoiceProvider>
        <App />
      </InvoiceProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();

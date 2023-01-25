// import React from "react";
// import { createRoot } from "react-dom/client";

// import App from "./App";
// // import * as serviceWorker from "./serviceWorker";
// import ReactDOM from 'react-dom/client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SnackbarUtilsConfigurator } from './components/snackbar';
import { SnackbarProvider } from "notistack";
// import { BrowserRouter } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
      <SnackbarProvider maxSnack={100} autoHideDuration={6000}>
      <SnackbarUtilsConfigurator />
        <App />
      </SnackbarProvider>
    </>
);

// serviceWorker.unregister();
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Dave store
// import { store } from "./app/store"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Nickel Store
import store from './store'
// import { Provider } from "react-redux"
import { AuthProvider } from './context/authProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Provider store={store}>
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <AuthProvider>
      {/* <Routes> */}
      {/* <Route path='/*' element={<App/>}/> */}
      <App/>
      {/* </Routes> */}
    </AuthProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
  // </Provider>
);



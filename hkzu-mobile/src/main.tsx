import { createRoot } from 'react-dom/client'
import 'antd-mobile/bundle/css-vars-patch.css'

// import "normalize.css";
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from "react-redux";
import { RouterProvider } from 'react-router';
import './index.css';
import router from './router';
// import store from './store';


createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)

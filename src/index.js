import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA9rEMwvhWfgJmHDRlgl3-5LOZQzrxDU7w",
  authDomain: "my-react-blog-15936.firebaseapp.com",
  projectId: "my-react-blog-15936",
  storageBucket: "my-react-blog-15936.appspot.com",
  messagingSenderId: "215806248456",
  appId: "1:215806248456:web:0605b62d4b804930ed33bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

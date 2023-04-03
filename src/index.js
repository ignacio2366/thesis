import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FacebookProvider } from "react-facebook-sdk";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <GoogleOAuthProvider clientId="905939041006-v7uvlj4klllsd5259rse4eltsnh8ju9m.apps.googleusercontent.com">
    <FacebookProvider appId="1233720077537218">
      <App />
    </FacebookProvider>
    </GoogleOAuthProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

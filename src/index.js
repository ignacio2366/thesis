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

reportWebVitals();

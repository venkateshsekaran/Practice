import React from "react";
import ReactDOM from "react-dom/client";
import Currency from "./Currency";
import App from "./App";
import Currapi from "./Currapi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Currapi />
    <App />
    <Currency />
  </React.StrictMode>
);

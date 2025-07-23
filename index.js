import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./src/reducer";
import { Provider } from "react-redux";
import "./index.css";
const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);

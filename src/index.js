import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Hub from "./Hub"
import 'boxicons';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Hub />
  </BrowserRouter>,
  document.getElementById("root")
);

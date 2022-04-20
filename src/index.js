import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Hub from "./Hub"
import 'boxicons';
import { BrowserRouter,HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Hub />
  </HashRouter>,
  document.getElementById("root")
);

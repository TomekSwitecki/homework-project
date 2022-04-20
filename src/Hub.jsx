import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import App from "./App";
import Registration from "./Registration/Registration";
const Hub=()=>
{
    return (
      <div>
        <Routes>
          <Route
            path="/homework-project/registration"
            element={<Registration />}
          />
          <Route path="/homework-project/home" element={<App />} />
        </Routes>
      </div>
    );
}

export default Hub
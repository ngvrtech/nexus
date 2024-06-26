// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import FieldHome from "./components/FieldHome";
import "./scss/styles.scss";
// import * as bootstrap from "bootstrap";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/field/home" element={<FieldHome />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

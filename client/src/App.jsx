// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import FieldHome from "./components/FieldHome";
import FieldOptions from "./components/FieldOptions";
import FieldInventory from "./components/FieldInventory";
import "./scss/styles.scss";
// import * as bootstrap from "bootstrap";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/field/" element={<FieldHome />} />
            <Route path="/field/:id" element={<FieldOptions />} />
            <Route path="/field/:id/inventory" element={<FieldInventory />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

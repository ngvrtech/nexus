// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import FieldHome from "./components/FieldHome";
import FieldOptions from "./components/FieldOptions";
import FieldInventory from "./components/FieldInventory";
import FieldCleaning from "./components/FieldCleaning";
import "./scss/styles.scss";
import AdminDashboard from "./components/AdminDashboard";
// import * as bootstrap from "bootstrap";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard/" element={<AdminDashboard />} />
            <Route path="/field/" element={<FieldHome />} />
            <Route path="/field/:id" element={<FieldOptions />} />
            <Route
              path="/field/:propertyID/inventory/:recordID"
              element={<FieldInventory />}
            />
            <Route
              path="/field/:propertyID/cleaning/:recordID"
              element={<FieldCleaning />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

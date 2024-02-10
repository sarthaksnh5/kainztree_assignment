import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/login/Login";
import Auth from "./auth/Auth";
import ProtectedRoute from "./util/ProtectedRoute";
import Home from "./portal/home/Home";
import Register from "./auth/register/Register.jsx";
import Items from "./portal/Items/Items.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path=""
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Home />} />
          <Route path="items" element={<Items />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);

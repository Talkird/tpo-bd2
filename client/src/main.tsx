import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Store from "./pages/Store.tsx";
import Cart from "./pages/Cart.tsx";
import Home from "./pages/Home.tsx";
import Facturas from "./pages/Facturas.tsx";
import Compra from "./pages/Compra.tsx";
import Pedidos from "./pages/Pedidos.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/compra" element={<Compra />} />
      </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
    </BrowserRouter>
  </React.StrictMode>,
);

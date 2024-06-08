import { useState } from "react";
import User from "../util/User";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    const sessionDuration = (Date.now() - User.getTimer()) / 1000;
    User.stopTimer();

    let userType = "";

    if (sessionDuration <= 10) {
      userType = "low";
    } else if (sessionDuration > 10 && sessionDuration < 30) {
      userType = "medium";
    } else {
      userType = "top";
    }

    const url = "http://localhost:8080/users/" + User.getEmail();

    fetch(url, {
      method: "PUT",
      body: userType,
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Se ha cerrado la sesión correctamente.");
          User.clearEmail();
          User.stopTimer();
        } else {
          toast.error("Error al cerrar sesión.");
        }
      })
      .catch((error) => {
        toast.error("Error al cerrar sesión.");
      });
  };

  return (
    <nav className="flex w-full flex-row items-center justify-between gap-8 rounded-lg bg-white p-4 shadow-md">
      <div>
        <Link onClick={handleLogout} className="text-2xl font-semibold" to="/">
          Página Principal
        </Link>
      </div>

      <div className="flex flex-row items-center gap-8">
        <Link to="/store" className="text-lg font-semibold">
          Tienda
        </Link>
        <Link to="/cart" className="text-lg font-semibold">
          Carrito
        </Link>
        <Link to="/facturas" className="text-lg font-semibold">
          Mis Facturas
        </Link>
      </div>

      <div className="flex flex-row items-center gap-8">
        <Link to="/login" className="text-lg font-semibold">
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          className="items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-lg font-semibold text-white transition hover:bg-blue-600"
        >
          Crear Cuenta
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

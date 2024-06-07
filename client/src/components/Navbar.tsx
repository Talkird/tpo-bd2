import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import User from "../util/User";

function Navbar() {
  const [sessionTime, setSessionTime] = useState(0);

  const handleLogout = () => {
    if (User.getEmail() !== "") {
      setSessionTime(User.getTimer());
      //User.clearEmail(); al final
      User.stopTimer();
    }

    //TODO put request change type
  }

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

import { useState, useEffect } from "react";
import {
  faCreditCard,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import IconInput from "../IconInput";
import toast from "react-hot-toast";
import User from "../../util/User";

interface ProductoCarrito {
  id: string;
  title: string;
  price: number;
  email: string;
  cantidad: number;
}

function GenerarFactura() {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [nombre, setNombre] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [pago, setPago] = useState("");
  const [metodo, setMetodo] = useState("credito");

  const calcularTotal = () => {
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.price * producto.cantidad;
    });
    return total;
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMetodo(event.target.value);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    const url = "http://localhost:8080/carritos/" + User.getEmail();

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data: ProductoCarrito[]) => setCarrito(data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  const generarFactura = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const requestBody = {
      nombre,
      email: User.getEmail(),
      domicilio,
      pago,
      metodo,
      price: calcularTotal(),
      date: new Date().toLocaleString(),
      productos: carrito,
    };

    fetch("http://localhost:8080/facturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Se ha generado la factura correctamente.");
        } else {
          toast.error("Error al generar la factura.");
        }
      })
      .catch((error) => {
        toast.error("Error al generar la factura.");
      });
  };

  return (
    <form
      onSubmit={generarFactura}
      className="flex flex-col rounded-lg bg-white p-5 text-center"
    >
      <h1 className="mb-2 text-5xl font-medium text-gray-800">
        {" "}
        Finalizar Compra{" "}
      </h1>
      <p className="mb-8 text-xl font-semibold text-gray-800">
        {" "}
        {formatCurrency(calcularTotal())}{" "}
      </p>

      <div>
        <p className="mb-2 ml-2 text-left font-semibold text-gray-800">
          Productos
        </p>
        <div className="flex flex-col">
          {carrito.map((item) => (
            <p
              className="mb-2 ml-2 justify-start rounded-xl border-2 pl-2 text-left font-medium text-gray-800"
              key={item.id}
            >
              {item.title} x {item.cantidad}:{" "}
              <span className="font-semibold text-black">
                {formatCurrency(item.price * item.cantidad)}{" "}
              </span>
            </p>
          ))}
        </div>
      </div>

      <p className="mb-2 ml-2 mt-5 text-left font-semibold text-gray-800">
        Información de usuario
      </p>
      <IconInput
        icon={faUser}
        placeholder="Nombre completo"
        onChange={setNombre}
      />
      <IconInput
        icon={faLocationDot}
        placeholder="Domicilio"
        onChange={setDomicilio}
      />
      <IconInput
        icon={faCreditCard}
        placeholder="Información de pago"
        onChange={setPago}
      />

      <p className="mb-2 ml-2 mt-4 text-left font-semibold text-gray-800">
        {" "}
        Método de pago{" "}
      </p>
      <select
        onChange={handleChange}
        className="ml-2 rounded-lg p-3 font-medium text-gray-700 transition hover:bg-gray-300"
      >
        <option value="credito">Crédito</option>
        <option value="debito">Débito</option>
        <option value="mp">Mercado Pago</option>
      </select>

      <button
        type="submit"
        className="m-5 mb-3 mt-7 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
      >
        Confirmar compra
      </button>
    </form>
  );
}

export default GenerarFactura;

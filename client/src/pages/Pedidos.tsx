import { useEffect, useState } from "react";
import User from "../util/User";

interface Pedido {
  id: string;
  email: string;
  price: number;
  date: string;
  cantidad: number;
  productos: ProductoCarrito[];
}

interface ProductoCarrito {
  id: string;
  title: string;
  price: number;
  email: string;
  cantidad: number;
}

function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    const url = "http://localhost:8080/facturas/" + User.getEmail(); //TODO cambiar a pedidos

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data: Pedido[]) => setPedidos(data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  return (
    <div className="h-screen bg-gradient-to-r from-cyan-500 to-teal-600">
      <div className="flex flex-grow rounded-lg text-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {pedidos.map((pedido) => (
          <div
            className="w- m-5 rounded-lg bg-white p-5 text-left text-xl shadow-sm"
            key={pedido.id}
          >
            <p>
              <span className="font-semibold"> Id:</span> {pedido.id}{" "}
            </p>
            <p>
              <span className="font-semibold"> Fecha:</span> {pedido.date}{" "}
            </p>
            <p>
              <span className="font-semibold"> Email:</span> {pedido.email}{" "}
            </p>
            <p>
              <span className="font-semibold"> Precio:</span>{" "}
              {formatCurrency(pedido.price)}{" "}
            </p>

            <p className="mt-8 font-semibold underline">Productos</p>
            <div className="flex flex-col">
              {pedido.productos.map((producto) => (
                <div key={producto.id} className="flex justify-between gap-8">
                  <p>{producto.title} </p>
                  <p>
                    <span className="font-semibold"> Cantidad:</span>{" "}
                    {producto.cantidad}{" "}
                  </p>
                  <p>
                    <span className="font-semibold"> Precio:</span>{" "}
                    {formatCurrency(producto.price)}{" "}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pedidos;

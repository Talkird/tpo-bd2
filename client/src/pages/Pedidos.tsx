import { useEffect, useState } from "react";
import User from "../util/User";
import Pedido from "../components/pedido/Pedido";
import PopupComprarPedidos from "../components/pedido/PopupComprarPedidos";

interface Pedido {
  id: string;
  email: string;
  price: number;
  date: string;
  cantidad: number;
  selected: boolean;
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

  const handleConfirmar = () => {};

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calcularTotal = () => {
    let total = 0;
    pedidos.forEach((pedido) => {
      if (pedido.selected) {
        total += pedido.price;
      }
    });
    return total;
  };

  useEffect(() => {
    const url = "http://localhost:8080/pedidos/" + User.getEmail();

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data: Pedido[]) => setPedidos(data))
      .catch((error) => console.error("Error fetching cart items:", error));
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-purple-600 p-5">
      <div className="m-5 w-64 justify-center rounded-lg bg-white p-5 text-center shadow-sm">
        <h1 className="text-xl font-bold"> Pedidos </h1>
        <p className="font-medium"> Costo: {formatCurrency(calcularTotal())}</p>
        <PopupComprarPedidos pedidos={pedidos} />
      </div>
      <div className="flex flex-grow rounded-lg text-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {pedidos.map((pedido) => (
          <Pedido
            id={pedido.id}
            email={pedido.email}
            price={pedido.price}
            date={pedido.date}
            cantidad={pedido.cantidad}
            productos={pedido.productos}
          />
        ))}
      </div>
    </div>
  );
}

export default Pedidos;

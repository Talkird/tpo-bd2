import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import User from "../../util/User";

interface ProductoCarrito {
  id: string;
  title: string;
  price: number;
  email: string;
  cantidad: number;
}

function ConfirmarCarrito() {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

  const calcularTotal = () => {
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.price * producto.cantidad;
    });
    return total;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const confirmarCarrito = (event: { preventDefault: () => void }) => {
    const url = "http://localhost:8080/pedidos";

    const requestBody = {
      email: User.getEmail(),
      price: calcularTotal(),
      date: new Date().toLocaleString(),
      productos: carrito,
      selected: false,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Pedido confirmado.");
          vaciarCarrito();
        } else {
          toast.error("Error al confirmar pedido.");
        }
      })
      .catch((error) => {
        toast.error("Error al confirmar pedido.");
      });
  };

  const vaciarCarrito = () => {
    const url = "http://localhost:8080/carritos/" + User.getEmail();

    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Carrito vaciado.");
        } else {
          toast.error("Error al vaciar carrito.");
        }
      })
      .catch((error) => {
        toast.error("Error al vaciar carrito.");
      });
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
  });

  return (
    <div className="m-5 w-64 justify-center rounded-lg bg-white p-5 text-center shadow-sm">
      <h1 className="text-xl font-bold"> Total Carrito </h1>
      <p className="text-md"> {formatCurrency(calcularTotal())} </p>
      <button
        className="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        onClick={confirmarCarrito}
      >
        Confirmar carrito
      </button>
    </div>
  );
}

export default ConfirmarCarrito;

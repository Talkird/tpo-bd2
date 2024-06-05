import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

interface ProductoCarrito {
  id: string;
  title: string;
  price: number;
  email: string;
  cantidad: number;
}

function ComprarCarrito() {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const calcularTotal = () => {
    let total = 0;
    carrito.forEach(producto => {
      total += (producto.price * producto.cantidad);
    });
    return total;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    const url =
      "http://localhost:8080/carritos/" + localStorage.getItem("usuario");

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

  const comprarCarrito = (event: { preventDefault: () => void }) => {
    if (localStorage.getItem("usuario") !== null) {
      navigate("/compra");
      toast.success("Redireccionando al portal de pago...")
    }
  }

  return (
    <div className="m-5 w-64 rounded-lg bg-white p-5 shadow-sm text-center justify-center">
    <h1 className="text-xl font-bold"> Total Carrito </h1>
    <p className="text-md"> {formatCurrency(calcularTotal())} </p>
    <button
      className="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
      onClick={comprarCarrito}
    >
      Comprar carrito
    </button>
  </div>
  )
}

export default ComprarCarrito
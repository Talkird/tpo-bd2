import { useEffect, useState } from "react";
import ProductoCarrito from "../components/ProductoCarrito";
import ComprarCarrito from "../components/ComprarCarrito";

interface Cart {
  id: string;
  title: string;
  price: number;
  email: string;
  cantidad: number;
}

function Cart() {
  const [carts, setCarts] = useState<Cart[]>([]);

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
      .then((data: Cart[]) => setCarts(data))
      .catch((error) => console.error("Error fetching cart items:", error));
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-5">
      <ComprarCarrito />
      <div className="grid rounded-lg text-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {carts.map((item) => (
        <ProductoCarrito
            key={item.id}
            titulo={item.title}
            precio={item.price}
            cantidad={item.cantidad}
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;

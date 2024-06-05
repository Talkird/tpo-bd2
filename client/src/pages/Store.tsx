import { useState, useEffect } from "react";
import Producto from "../components/Producto";

interface Product {
  id: string;
  title: string;
  price: number;
}

function Store() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/productos")
      .then((response) => {
        return response.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-5">
      <div className="grid rounded-lg text-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {products.map((product) => (
          <Producto
            key={product.id}
            titulo={product.title}
            precio={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Store;

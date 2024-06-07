import { useEffect, useState } from "react";
import User from "../util/User";

interface Factura {
  id: string;
  nombre: string;
  email: string;
  domicilio: string;
  pago: string;
  metodo: string;
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

function Facturas() {
  const [facturas, setFacturas] = useState<Factura[]>([]);

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
      "http://localhost:8080/facturas/" + User.getEmail();

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data: Factura[]) => setFacturas(data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  return (
    <div className="h-screen bg-gradient-to-r from-cyan-500 to-teal-600">
      <div className="flex flex-grow rounded-lg text-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {facturas.map((factura) => (
        <div className="w- text-xl text-left m-5 rounded-lg bg-white p-5 shadow-sm" key={factura.id}>
          <p><span className="font-semibold"> Id:</span> {factura.id} </p>
          <p><span className="font-semibold"> Fecha:</span> {factura.date} </p>
          <p><span className="font-semibold"> Nombre:</span> {factura.nombre} </p>
          <p><span className="font-semibold"> Email:</span> {factura.email} </p>
          <p><span className="font-semibold"> Domicilio:</span> {factura.domicilio} </p>
          <p><span className="font-semibold"> Tarjeta:</span> {factura.pago} </p>
          <p><span className="font-semibold"> Método:</span> {factura.metodo} </p>
          <p><span className="font-semibold"> Precio:</span> {formatCurrency(factura.price)} </p>

          <p className="font-semibold mt-8 underline">Productos</p>
          <div className="flex flex-col">
            {factura.productos.map((producto) => (
              <div key={producto.id} className="flex gap-8 justify-between">
                <p>{producto.title} </p>
                <p><span className="font-semibold"> Cantidad:</span> {producto.cantidad} </p>
                <p><span className="font-semibold"> Precio:</span> {formatCurrency(producto.price)} </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Facturas;

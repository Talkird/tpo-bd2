import React from "react";
import toast from "react-hot-toast";

interface PedidoProps {
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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

function Pedido(props: PedidoProps) {
  const [selected, setSelected] = React.useState(false);

  const handleEliminar = () => {
    fetch("http://localhost:8080/pedidos/id/" + props.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Pedido eliminado correctamente");
        } else {
          toast.error("Error al eliminar el pedido");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error deleting order:", error));
  };

  const handleSelect = () => {
    setSelected(!selected);

    fetch("http://localhost:8080/pedidos/" + props.id + "/selected", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error selecting order:", error));
  };

  return (
    <div
      className="m-15 w-96 rounded-lg bg-white p-5 text-left text-xl shadow-sm"
      key={props.id}
    >
      <p>
        <span className="font-semibold"> Id:</span> {props.id}{" "}
      </p>
      <p>
        <span className="font-semibold"> Fecha:</span> {props.date}{" "}
      </p>
      <p>
        <span className="font-semibold"> Email:</span> {props.email}{" "}
      </p>
      <p>
        <span className="font-semibold"> Precio:</span>{" "}
        {formatCurrency(props.price)}{" "}
      </p>

      <p className="mt-8 font-semibold underline">Productos</p>
      <div className="flex flex-col">
        {props.productos.map((producto) => (
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
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-3">
          <p> Seleccionar </p>
          <input
            className="h-7 w-7 rounded-sm accent-emerald-400"
            onChange={handleSelect}
            type="checkbox"
          />
        </div>
        <button
          className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 "
          onClick={handleEliminar}
        >
          {" "}
          Eliminar{" "}
        </button>
      </div>
    </div>
  );
}

export default Pedido;

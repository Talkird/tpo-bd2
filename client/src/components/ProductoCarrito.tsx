import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";
import User from "../util/User";

interface ProductoCarritoProps {
  titulo: string;
  precio: number;
  cantidad: number;
}

function ProductoCarrito(props: ProductoCarritoProps) {
  const [count, setCount] = useState(props.cantidad);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const eliminarProducto = (event: { preventDefault: () => void }) => {
    const url = "http://localhost:8080/carritos/" + User.getEmail() + "/" + props.titulo;

    fetch(url, {
      method: "DELETE"
    })
    .then((response) => {
      if (response.ok) {
        toast.success("Producto eliminado del carrito.")
      } else {
        toast.error("Error al eliminar del carrito.")
      }
      })
      
    .catch((error) => {
      toast.error("Error al eliminar del carrito.");
    });
  };

  const cambiarCantidad = (newCount: number) => {
    const requestBody = newCount;

    const url =
      "http://localhost:8080/carritos/" +
      User.getEmail() +
      "/" +
      props.titulo;

    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          setCount(newCount);
        } else {
          toast.error("Error al modificar cantidad.");
        }
      })
      .catch((error) => {
        toast.error("Error al modificar cantidad.");
      });
  };

  return (
    <div className="m-5 w-64 rounded-lg bg-white p-5 shadow-sm">
      <h1 className="text-xl font-bold">{props.titulo}</h1>
      <p className="text-md mb-5"> {formatCurrency(props.precio * count)}</p>
      <div className="mx-10 flex flex-row items-center justify-center gap-5 rounded-full border-2 border-solid border-gray-700 py-1">
        <FontAwesomeIcon
          className="text-gray-700 transition hover:text-red-500"
          icon={faMinus}
          size="lg"
          onClick={() => {
            if (count > 1) {
              cambiarCantidad(count - 1);
            }
          }}
        />

        <p className="text-black"> {count} </p>

        <FontAwesomeIcon
          className="text-gray-700 transition hover:text-green-500"
          icon={faPlus}
          size="lg"
          onClick={() => {
            if (count < 5) {
              cambiarCantidad(count + 1);
            }
          }}
        />
      </div>
      <button
        className="mt-3 rounded-lg bg-gray-300 px-4 py-2 text-black transition hover:bg-red-500 hover:text-white"
        onClick={eliminarProducto}
      >
        Borrar del carrito
      </button>
    </div>
  );
}

export default ProductoCarrito;

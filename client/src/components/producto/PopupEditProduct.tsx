import { useState } from "react";
import toast from "react-hot-toast";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface EditProductProps {
  title: string;
  price: number;
}

function EditProduct(props: EditProductProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const [text, setText] = useState("");

  const onSave = () => {
    const requestBody = {
      title: props.title,
      price: parseInt(text),
    };

    fetch("http://localhost:8080/productos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Producto editado correctamente.");
        } else {
          console.error("Error al editar producto.");
        }
      })
      .catch((error) => {
        console.error("Error al editar producto.");
      });
  };

  return (
    <div>
      <Popup
        trigger={
          <button className="mt-3 rounded-lg bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-600">
            Edit
          </button>
        }
        position="right center"
      >
        <div className="flex flex-col items-center justify-center gap-3 p-3">
          <h1 className="font-bold ">
            Editar producto:
            <span className="font-normal"> {props.title} </span>{" "}
          </h1>
          <h1 className="font-bold">
            Precio actual:{" "}
            <span className="font-normal">{formatCurrency(props.price)}</span>
          </h1>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            placeholder="Precio nuevo"
          />

          <button
            className="mt-3 rounded-lg bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-600"
            onClick={onSave}
          >
            Guardar cambios
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default EditProduct;

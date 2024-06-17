import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import IconInput from "../IconInput";
import toast from "react-hot-toast";
import {
  faCreditCard,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import User from "../../util/User";
import ProductoCarrito from "../carrito/ProductoCarrito";

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

interface ComprarPedidosProps {
  pedidos: Pedido[];
}

function ComprarPedidos(props: ComprarPedidosProps) {
  const [nombre, setNombre] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [pago, setPago] = useState("");
  const [metodo, setMetodo] = useState("credito");

  const productos: ProductoCarrito[] = [];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMetodo(event.target.value);
  };

  const calcularTotal = () => {
    let total = 0;
    props.pedidos.forEach((pedido) => {
      if (pedido.selected) {
        total += pedido.price;
      }
    });
    return total;
  };

  const llenarProductos = () => {
    props.pedidos.forEach((pedido) => {
      if (pedido.selected) {
        pedido.productos.forEach((producto) => {
          productos.push(producto);
        });
      }
    });
  };

  const borrarPedidos = () => {
    props.pedidos.forEach((pedido) => {
      if (pedido.selected) {
        fetch("http://localhost:8080/pedidos/email/" + pedido.email, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => console.log(data))
          .catch((error) => console.error("Error deleting order:", error));
      }
    });
  };

  const handleConfirmar = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    llenarProductos();

    const requestBody = {
      nombre,
      email: User.getEmail(),
      domicilio,
      pago,
      metodo,
      price: calcularTotal(),
      date: new Date().toLocaleString(),
      productos: productos,
    };

    fetch("http://localhost:8080/facturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Se ha generado la factura correctamente.");
          borrarPedidos();
        } else {
          toast.error("Error al generar la factura.");
        }
      })
      .catch((error) => {
        toast.error("Error al generar la factura.");
      });
  };

  return (
    <div>
      <Popup
        trigger={
          <button className="mt-3 rounded-lg bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-600">
            Confirmar Seleccionados
          </button>
        }
        position="center center"
        modal
        contentStyle={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: "0 auto",
        }}
      >
        <div className="p-15 m-0 flex flex-col items-center justify-center gap-3 p-0">
          <p className="mb-2 ml-2 mt-5 text-left font-semibold text-gray-800">
            Información de usuario
          </p>
          <IconInput
            icon={faUser}
            placeholder="Nombre completo"
            onChange={setNombre}
          />
          <IconInput
            icon={faLocationDot}
            placeholder="Domicilio"
            onChange={setDomicilio}
          />
          <IconInput
            icon={faCreditCard}
            placeholder="Información de pago"
            onChange={setPago}
          />

          <p className="mb-2 ml-2 mt-4 text-left font-semibold text-gray-800">
            {" "}
            Método de pago{" "}
          </p>
          <select
            onChange={handleChange}
            className="ml-2 rounded-lg p-3 font-medium text-gray-700 transition hover:bg-gray-300"
          >
            <option value="credito">Crédito</option>
            <option value="debito">Débito</option>
            <option value="mp">Mercado Pago</option>
          </select>

          <button
            className="m-5 mb-3 mt-7 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
            onClick={handleConfirmar}
          >
            Confirmar compra
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default ComprarPedidos;

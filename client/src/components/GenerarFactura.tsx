import { useState, useEffect } from "react";
import { faCreditCard, faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons"
import IconInput from "./IconInput"
import toast from "react-hot-toast";
import User from "../util/User";

interface ProductoCarrito {
  id: string;
  title: string;
  price: number;
  email: string;
  cantidad: number;
}

function GenerarFactura() {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [nombre, setNombre] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [pago, setPago] = useState("");
  const [metodo, setMetodo] = useState("credito");

  const calcularTotal = () => {
    let total = 0;
    carrito.forEach(producto => {
      total += (producto.price * producto.cantidad);
    });
    return total;
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMetodo(event.target.value);
};

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
      "http://localhost:8080/carritos/" + User.getEmail();

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data: ProductoCarrito[]) => setCarrito(data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);


  const generarFactura = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const requestBody = { 
      nombre, email: User.getEmail(), domicilio, pago, metodo, price: calcularTotal(), date: new Date().toLocaleString(), productos: carrito
    };

    fetch("http://localhost:8080/facturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Se ha generado la factura correctamente.");
        } else {
          toast.error("Error al generar la factura.");
        }
      })
      .catch((error) => {
        toast.error("Error al generar la factura.");
      });
  };

  return (
    <form onSubmit={generarFactura} className="flex flex-col bg-white rounded-lg p-5 text-center">
        <h1 className="text-5xl font-medium mb-2 text-gray-800"> Finalizar Compra </h1>
        <p className="text-xl font-semibold mb-8 text-gray-800"> {formatCurrency(calcularTotal())} </p>

        <div>
          <p className="text-gray-800 font-semibold text-left ml-2 mb-2">Productos</p>
          <div className="flex flex-col">
           
          {carrito.map((item) => (
        <p className= "pl-2 rounded-xl border-2 text-left justify-start text-gray-800 font-medium ml-2 mb-2" key={item.id}> 
        {item.title} x {item.cantidad}: <span className="text-black font-semibold">{formatCurrency(item.price * item.cantidad)} </span>
        </ p>
        
        ))}
          </div>
        </div>

        <p className="text-gray-800 font-semibold text-left mt-5 ml-2 mb-2">Información de usuario</p>
        <IconInput icon={faUser} placeholder="Nombre completo" onChange={setNombre}/>
        <IconInput icon={faLocationDot} placeholder="Domicilio" onChange={setDomicilio}/>
        <IconInput icon={faCreditCard} placeholder="Información de pago" onChange={setPago}/>

        <p className="mt-4 text-gray-800 font-semibold ml-2 mb-2 text-left"> Método de pago </p>
        <select onChange={handleChange} className="text-gray-700 hover:bg-gray-300 transition ml-2 p-3 rounded-lg font-medium">
            <option value="credito">Crédito</option>
            <option value="debito">Débito</option>
            <option value="mp">Mercado Pago</option>
        </select>

        <button 
        type="submit"
        className="mt-7 mb-3 m-5 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
      >
        Confirmar compra
      </button>

    </form>
  )
}

export default GenerarFactura
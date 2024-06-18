import toast from "react-hot-toast";
import User from "../../util/User";
import EditProduct from "./PopupEditProduct";

interface ProductoProps {
  titulo: string;
  precio: number;
}

function Producto(props: ProductoProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const borrarProducto = () => {
    const requestBody = {
      title: props.titulo,
    };

    fetch("http://localhost:8080/productos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Producto eliminado correctamente.");
        } else {
          toast.error("Error al eliminar producto.");
        }
      })
      .catch((error) => {
        toast.error("Error al eliminar producto.");
      });
  };

  const agregarAlCarrito = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (User.getEmail() === null || User.getEmail() === "") {
      toast.error("Debe iniciar sesión.");
      return;
    }

    const requestBody = {
      title: props.titulo,
      price: props.precio,
      email: User.getEmail(),
      cantidad: 1,
    };

    fetch("http://localhost:8080/carritos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Se ha agregado el producto exitosamente.");
        } else {
          toast.error("Error, producto ya está en el carrito.");
        }
      })
      .catch((error) => {
        toast.error("Error al agregar producto al carrito.");
      });
  };

  return (
    <div className="m-5 w-64 rounded-lg bg-white p-5 shadow-sm">
      <h1 className="text-xl font-bold">{props.titulo}</h1>
      <p className="text-md">{formatCurrency(props.precio)}</p>
      {User.getEmail() !== null && User.getEmail() != "admin" && (
        <button
          className="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          onClick={agregarAlCarrito}
        >
          Añadir al carrito
        </button>
      )}

      {User.getEmail() === "admin" && (
        <>
          <EditProduct title={props.titulo} price={props.precio} />
          <button
            className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            onClick={borrarProducto}
          >
            Eliminar
          </button>
        </>
      )}
    </div>
  );
}

export default Producto;

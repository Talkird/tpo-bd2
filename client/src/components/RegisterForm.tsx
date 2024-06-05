import { useState } from "react";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import IconInput from "./IconInput";
import { Link, useNavigate } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const requestBody = { email, password, type: "regular" };

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Usuario registrado correctamente.");
          navigate("/login");
        } else {
          toast.error("Error, el email ya existe.");
        }
      })
      .catch((error) => {
        toast.error("Error al registrar usuario.");
      });
  };

  return (
    <form
      className="m-5 w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg"
      onSubmit={handleRegister}
    >
      <h1 className="mb-4 text-4xl font-bold text-gray-800">Registrarse</h1>
      <p className="mb-6 text-xl text-gray-600">
        Bienvenido, por favor ingrese sus datos para registrarse:
      </p>

      <IconInput onChange={setEmail} icon={faEnvelope} placeholder="Email" />
      <IconInput
        onChange={setPassword}
        icon={faLock}
        placeholder="Contraseña"
      />

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-blue-500 px-4 py-3 text-xl font-semibold text-white transition hover:bg-blue-600"
      >
        Registrarse
      </button>

      <div className="mt-4 flex w-full flex-row justify-center gap-1 text-center">
        <p>Ya tenés cuenta?</p>
        <Link to="/" className="text-blue-500 transition hover:underline">
          Iniciar Sesión
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;

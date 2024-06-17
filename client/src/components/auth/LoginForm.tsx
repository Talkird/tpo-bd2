import { useState } from "react";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import IconInput from "../IconInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";
import User from "../../util/User";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const requestBody = { email, password, type: "low" };

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Se ha iniciado sesión correctamente.");
          navigate("/store");
          User.setEmail(email);
          User.startTimer();
        } else {
          toast.error("Error, email o contraseña incorrecta.");
        }
      })
      .catch((error) => {
        toast.error("Error al iniciar sesión.");
      });
  };

  return (
    <form
      className="m-5 w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg"
      onSubmit={handleLogin}
    >
      <h1 className="mb-4 text-4xl font-bold text-gray-800">Iniciar Sesión</h1>
      <p className="mb-6 text-xl text-gray-600">
        Bienvenido, ingrese sus datos:
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
        Iniciar Sesión
      </button>

      <div className="mt-4 flex w-full flex-row justify-center gap-1 text-center">
        <p> No tenés cuenta? </p>
        <Link
          to="/register"
          className="text-blue-500 transition hover:underline"
        >
          Registrate
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;

import { faEnvelope, faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons"
import IconInput from "./IconInput"


function GenerarFactura() {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "ARS",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      };

  return (
    <div className="flex flex-col bg-white rounded-lg p-5 text-center">
        <h1 className="text-5xl font-medium mb-2 text-gray-800"> Finalizar Compra </h1>
        <p className="text-xl font-semibold mb-8 text-gray-800"> {formatCurrency(0)} </p>

        <IconInput icon={faUser} placeholder="Nombre completo" onChange={() => {console.log("")}}/>
        <IconInput icon={faEnvelope} placeholder="Email" onChange={() => {console.log("")}}/>
        <IconInput icon={faLocationDot} placeholder="Domicilio" onChange={() => {console.log("")}}/>
            
        <p className="mt-4 text-gray-800 font-semibold ml-2 mb-2 text-left"> Método de pago </p>
        <select className="text-gray-700 hover:bg-gray-300 transition ml-2 p-3 rounded-lg font-medium">
            <option value="credito">Crédito</option>
            <option value="debito">Débito</option>
            <option value="mp">Mercado Pago</option>
        </select>

        <button
        className="mt-7 mb-3 m-5 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
      >
        Confirmar compra
      </button>

    </div>
  )
}

export default GenerarFactura
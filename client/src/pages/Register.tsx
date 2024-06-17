import React from "react";
import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-l from-blue-500 to-cyan-600">
      <RegisterForm />
    </div>
  );
}

export default Register;

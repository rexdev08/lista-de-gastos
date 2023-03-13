import { ReactComponent as IconoCerrarSesion } from "../imagenes/log-out.svg";
import Boton from "./Boton.js";
import { auth } from "../firebase/firebaseConfig.js";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React from 'react';

const BotonCerrarSesion = () => {
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Boton iconoGrande as={"button"} onClick={(cerrarSesion)}>
      <IconoCerrarSesion />
    </Boton>
  );
};

export default BotonCerrarSesion;

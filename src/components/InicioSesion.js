import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from "../elements/Header.js";
import Boton from "../elements/Boton.js";
import {
  Formulario,
  Input,
  ContenedorBoton,
} from "../elements/ElementosDeFormulario.js";
import { ReactComponent as SvgLogin } from "../imagenes/login.svg";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";
import Alerta from "../elements/Alerta.js";
import React from "react";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem;
  margin-bottom: 1.25rem;
`;

const InicioSesion = () => {
  const navigate = useNavigate();
  const [correo, establecerCorreo] = useState("");
  const [password, establecerPassword] = useState("");
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "correo") {
      establecerCorreo(e.target.value);
    } else if (e.target.name === "password") {
      establecerPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});

    const regExp = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!regExp.test(correo)) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "correo no valido, ingresa uno valido",
      });
      // console.log("correo no valido, ingresa uno valido");
      return;
    }

    if (correo === "" || password === "") {
      // console.log("rellene todos los datos");
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "rellene todos los campos",
      });
      return;
    }

    try {
      // const res = await signInWithEmailAndPassword(auth, correo, password);
      await signInWithEmailAndPassword(auth, correo, password);
      // console.log("ingreso exitoso");
      // console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error.code);

      cambiarEstadoAlerta(true);

      let mensaje;
      switch (error.code) {
        case "auth/user-not-found":
          mensaje = "Usuario no encontrado";
          break;
        case "auth/wrong-password":
          mensaje = "Password incorrecto";
          break;
        case "auth/too-many-requests":
          mensaje = "Demasiados intentos";
          break;
        default:
          mensaje = "Hubo un error";
          break;
      }

      cambiarAlerta({
        tipo: "error",
        mensaje: mensaje,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar sesion</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar sesion</Titulo>
          <div>
            <Boton to="/crear-cuenta">Registrarse</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          type={"email"}
          name="correo"
          placeholder="Correo Electronico"
          value={correo}
          onChange={handleChange}
        />
        <Input
          type={"password"}
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        />

        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Iniciar sesion
          </Boton>
        </ContenedorBoton>
      </Formulario>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </>
  );
};

export default InicioSesion;

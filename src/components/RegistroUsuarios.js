import { useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from "../elements/Header.js";
import Boton from "../elements/Boton.js";
import {
  Formulario,
  Input,
  ContenedorBoton,
} from "../elements/ElementosDeFormulario.js";
import { ReactComponent as SvgLogin } from "../imagenes/registro.svg";
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Alerta from "../elements/Alerta.js";
import React from "react";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem;
  margin-bottom: 1.25rem;
`;

const RegistroUsuarios = () => {
  const navigate = useNavigate();
  const [correo, establecerCorreo] = useState("");
  const [password, establecerPassword] = useState("");
  const [password2, establecerPassword2] = useState("");
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        establecerCorreo(e.target.value);
        break;
      case "password":
        establecerPassword(e.target.value);
        break;
      case "password2":
        establecerPassword2(e.target.value);
        break;
      default:
        break;
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

    if (correo === "" || password === "" || password2 === "") {
      // console.log("rellene todos los datos");
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "rellene todos los campos",
      });
      return;
    }

    if (password !== password2) {
      // console.log("las contrasenas no son iguales");
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "las contrasenas no son iguales",
      });
      return;
    }

    // console.log("registramos usario");
    try {
      // const res = await createUserWithEmailAndPassword(auth, correo, password);
      await createUserWithEmailAndPassword(auth, correo, password);
      // console.log("usuario registrado con exito");
      // console.log(res);
      navigate("/");
    } catch (error) {
      // console.log(error.code);

      cambiarEstadoAlerta(true);

      let mensaje;
      switch (error.code) {
        case "auth/weak-password":
          mensaje =
            "El valor proporcionado para la propiedad de usuario de la password no es válido. Debe ser una cadena con al menos seis caracteres.";
          break;
        case "auth/email-already-in-use":
          mensaje =
            "El correo electrónico proporcionado ya está en uso por un usuario existente. Cada usuario debe tener un correo electrónico único.";
          break;
        case "auth/invalid-email":
          mensaje =
            "El valor proporcionado para la propiedad de usuario de email no es válido. Debe ser una dirección de correo electrónico de cadena.";
          break;
        default:
          mensaje = "Hubo un error al intentar crear la cuenta.";
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
        <title>Crear cuenta</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Crear cuenta</Titulo>
          <div>
            <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          value={correo}
          onChange={handleChange}
          type={"email"}
          name="email"
          placeholder="Correo Electronico"
        />
        <Input
          value={password}
          onChange={handleChange}
          type={"password"}
          name="password"
          placeholder="Contraseña"
        />
        <Input
          value={password2}
          onChange={handleChange}
          type={"password"}
          name="password2"
          placeholder=" Repetir la contraseña"
        />

        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Crear Cuenta
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

export default RegistroUsuarios;

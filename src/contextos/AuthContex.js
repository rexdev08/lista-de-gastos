import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import React from 'react';

const AuthContext = createContext();

//Hook para acceder al contexto
const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  //estado para almacenar el usuario
  const [usuario, cambiarUsuario] = useState();

  //creamos estado para saber cunado termina de cargar la comprobacion de onAuthStateChanged
  const [cargando, cambiarCargando] = useState(true);

  //efecto para ejecutar la comprobacion 1 sola vez
  useEffect(() => {
    //comprovamos si hay un usario.
    const cancelarSuscripcion = onAuthStateChanged(auth, (user) => {
      cambiarUsuario(user);
      cambiarCargando(false);
    });

    return cancelarSuscripcion;
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: usuario }}>
      {/* Solamente retornamos los elementos hijos cuando no este cargando.*/}
      {!cargando && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };

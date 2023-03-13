import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
import Contenedor from "./elements/Contenedor.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioSesion from "./components/InicioSesion.js";
import EditarGasto from "./components/EditarGasto.js";
import GastosPorCategoria from "./components/GastosPorCategoria.js";
import ListaDeGastos from "./components/ListaDeGastos.js";
import RegistroUsuarios from "./components/RegistroUsuarios";
import { Helmet } from "react-helmet";
import favicon from "./imagenes/logo.png";
import Fondo from "./elements/Fondo";
import { AuthProvider } from "./contextos/AuthContex.js";
import RutaProtegida from "./components/RutaPrivada";
import {TotalGastadoProvider} from "./contextos/totalGastadoEnElMesContext";

WebFont.load({
  google: {
    families: ["Work Sans:400,500,700", "sans-serif"],
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <>
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      <title>hola mundo</title>
    </Helmet>
    <AuthProvider>
      <TotalGastadoProvider>
        <Router>
          <Contenedor>
            <Routes>
              <Route path="/iniciar-sesion" element={<InicioSesion />}></Route>
              <Route
                path="/crear-cuenta"
                element={<RegistroUsuarios />}
              ></Route>

              <Route
                path="/categorias"
                element={
                  <RutaProtegida path="/categorias">
                    <GastosPorCategoria />
                  </RutaProtegida>
                }
              />

              <Route
                path="/lista"
                element={
                  <RutaProtegida path="/Lista">
                    <ListaDeGastos />
                  </RutaProtegida>
                }
              />

              <Route
                path="/editar/:id"
                element={
                  <RutaProtegida path="/editar/:id">
                    <EditarGasto />
                  </RutaProtegida>
                }
              />

              <Route
                path="/"
                element={
                  <RutaProtegida path="/">
                    <App />
                  </RutaProtegida>
                }
              />

              {/* <Route
                path="/categorias"
                element={<GastosPorCategoria />}
              ></Route>
              <Route path="/lista" element={<ListaDeGastos />}></Route>
              <Route path="/editar/:id" element={<EditarGasto />}></Route>
              <Route path="/" element={<App />}></Route> */}
            </Routes>
          </Contenedor>
        </Router>
      </TotalGastadoProvider>
    </AuthProvider>
    <Fondo />
  </>
  // </React.StrictMode>
);

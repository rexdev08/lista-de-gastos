import React from 'react';
import { Helmet } from "react-helmet";
import {
  Header,
  Titulo,
  ContenedorHeader,
  ContenedorBotones,
} from "./elements/Header.js";
import Boton from "./elements/Boton.js";
import BotonCerrarSesion from "./elements/BotonCerrarSesion.js";
import FormularioGasto from "./components/FormularioGasto.js";
import BarraTotalGastado from "./components/BarraTotalGastado.js";

function App() {
  return (
    
      <>
        <Helmet>
          <title>Agregar Gasto</title>
        </Helmet>

        <Header>
          <ContenedorHeader>
            <Titulo>Agregar Gasto</Titulo>
            <ContenedorBotones>
              <Boton to="categorias">Categorias</Boton>
              <Boton to="lista">Lista de Gastos</Boton>
              <BotonCerrarSesion />
            </ContenedorBotones>
          </ContenedorHeader>
        </Header>

        <FormularioGasto />
        <BarraTotalGastado /> 
      </>
   
  );
}

export default App;

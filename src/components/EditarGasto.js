import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header, Titulo } from "../elements/Header";
import BtnRegresar from "../elements/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import FomularioGasto from "./FormularioGasto";
import useObtenerGasto from "../hooks/useObtenerGasto";
import React from 'react';

const EditarGasto = () => {
  const { id } = useParams();
  const [gasto] = useObtenerGasto(id);

  return (
    <>
      <Helmet>
        <title>Editar gasto</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta="/lista" />
        <Titulo>Editar gasto</Titulo>
      </Header>

      <FomularioGasto gasto={gasto} />

      <BarraTotalGastado />
    </>
  );
};

export default EditarGasto;

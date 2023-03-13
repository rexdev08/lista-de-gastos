import { Helmet } from "react-helmet";
import { Header, Titulo } from "../elements/Header";
import BtnRegresar from "../elements/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
// import useObtenerGastosDelMes from "../hooks/useObtenerGastosDelMes";
import useObtenerGastosDelMesPorCategoria from "../hooks/useObtenerGastosDelMesPorCategoria";
import {
  ListaDeCategorias,
  ElementoListaCategorias,
  Categoria,
  Valor,
} from "../elements/ElementosDeLista.js";
import IconoCategoria from "../elements/IconoCategoria.js";
import FormaterarCantidad from "../funciones/convertirAMoneda.js";
import React from 'react';

const GastosPorCategoria = () => {
  // const [gastos] = useObtenerGastosDelMes();
  const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();
  // console.log(gastosPorCategoria);
  return (
    <>
      <Helmet>
        <title>Gastos por categoria</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta="/" />
        <Titulo>Gastos por categoria</Titulo>
      </Header>

      <ListaDeCategorias>
        {gastosPorCategoria.map((elemento, index) => {
          return (
            <ElementoListaCategorias key={index}>
              <Categoria>
                <IconoCategoria id={elemento.categoria} />
                {elemento.categoria}
              </Categoria>
              <Valor>{FormaterarCantidad(elemento.cantidad)}</Valor>
            </ElementoListaCategorias>
          );
        })}
      </ListaDeCategorias>

      <BarraTotalGastado />
    </>
  );
};

export default GastosPorCategoria;

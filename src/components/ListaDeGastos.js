import { Helmet } from "react-helmet";
import { Header, Titulo } from "../elements/Header";
import BtnRegresar from "../elements/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
// import { AuthContext } from "../contextos/AuthContex.js";
// import { useContext } from "react";
import useObtenerGastos from "../hooks/useObtenerGastos.js";
import {
  Lista,
  ElementoLista,
  Categoria,
  Descripcion,
  Valor,
  Fecha,
  ContenedorBotones,
  BotonAccion,
  BotonCargarMas,
  ContenedorBotonCentral,
  ContenedorSubtitulo,
  Subtitulo,
} from "../elements/ElementosDeLista.js";
import IconoCategoria from "../elements/IconoCategoria.js";
import FormaterarCantidad from "../funciones/convertirAMoneda.js";
import { ReactComponent as IconoEditar } from "../imagenes/editar.svg";
import { ReactComponent as IconoBorrar } from "../imagenes/borrar.svg";
import { Link } from "react-router-dom";
import Boton from "../elements/Boton.js";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";
import borrarGasto from "../firebase/borrarGasto.js";
import React from "react";

const ListaDegastos = () => {
  const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();

  const formatearFecha = (fecha) => {
    return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {
      locale: es,
    });
  };

  const fechaEsIgual = (gastos, index, gasto) => {
    if (index !== 0) {
      const fechaActual = formatearFecha(gasto.fecha);
      const fechaGastoAnterior = formatearFecha(gastos[index - 1].fecha);

      if (fechaActual === fechaGastoAnterior) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de gastos</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta="/" />
        <Titulo>Lista de gastos</Titulo>
      </Header>

      <Lista>
        {gastos.map((gasto, index) => {
          return (
            <div key={gasto.id}>
              {!fechaEsIgual(gastos, index, gasto) && (
                <Fecha>{formatearFecha(gasto.fecha)}</Fecha>
              )}
              <ElementoLista key={gasto.id}>
                <Categoria>
                  <IconoCategoria id={gasto.categoria} />
                  {gasto.categoria}
                </Categoria>
                <Descripcion>{gasto.descripcion}</Descripcion>
                <Valor>{FormaterarCantidad(gasto.cantidad)}</Valor>
                <ContenedorBotones>
                  <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                    <IconoEditar />
                  </BotonAccion>
                  <BotonAccion onClick={() => borrarGasto(gasto.id)}>
                    <IconoBorrar />
                  </BotonAccion>
                </ContenedorBotones>
              </ElementoLista>
            </div>
          );
        })}

        {hayMasPorCargar && (
          <ContenedorBotonCentral>
            <BotonCargarMas onClick={obtenerMasGastos}>
              Cargar mas
            </BotonCargarMas>
          </ContenedorBotonCentral>
        )}
        {gastos.length === 0 && (
          <ContenedorSubtitulo>
            <Subtitulo>No hay gastos por mostrar</Subtitulo>
            <Boton as={Link} to="/">
              Agregar gasto
            </Boton>
          </ContenedorSubtitulo>
        )}
      </Lista>

      <BarraTotalGastado />
    </>
  );
};

export default ListaDegastos;

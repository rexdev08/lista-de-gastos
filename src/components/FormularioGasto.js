import React from 'react';
import { useState, useEffect } from "react";
import Boton from "../elements/Boton.js";
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from "../elements/ElementosDeFormulario.js";
import { ReactComponent as IconoPlus } from "../imagenes/plus.svg";
import SelectCategorias from "./SelectCategorias.js";
import DatePicker from "./DatePicker.js";
import { getUnixTime } from "date-fns";
import fromUnixTime from "date-fns/fromUnixTime";
import { useAuth } from "../contextos/AuthContex.js";
import agregarGasto from "../firebase/agregarGasto.js";
import Alerta from "../elements/Alerta.js";
import { useNavigate } from "react-router-dom";
import editarGasto from "../firebase/editarGasto.js";

const FormularioGasto = ({ gasto }) => {
  const [inputDescripcion, cambiarInputDescripcion] = useState("");
  const [inputCantidad, cambiarInputCantidad] = useState("");
  const [categoria, cambiarCategoria] = useState("hogar");
  const [fecha, cambiarFecha] = useState(new Date());
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //Comprobamos si ya hay algun gasto,
    //De ser asi establecemos todo el state con los valores del gasto.
    if (gasto) {
      //Comprobamos que el gasto sea del usuario actual.
      // Para eso comprobamos el uid guardado en el gasto con el uid del usuario.
      if (gasto.data().uidUsuario === usuario.uid) {
        cambiarCategoria(gasto.data().categoria);
        cambiarFecha(fromUnixTime(gasto.data().fecha));
        cambiarInputDescripcion(gasto.data().descripcion);
        cambiarInputCantidad(gasto.data().cantidad);
      } else {
        navigate("/lista");
      }
    }
  }, [gasto, usuario, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "descripcion") {
      cambiarInputDescripcion(e.target.value);
    } else if (e.target.name === "cantidad") {
      cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ""));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let cantidad = parseFloat(inputCantidad).toFixed(2);

    // Comprobamos que haya una descripcion y valor

    if (inputDescripcion !== "" && inputCantidad !== "") {
      if (cantidad) {
          if(gasto){
            editarGasto({
              id: gasto.id,
              categoria: categoria,
              descripcion: inputDescripcion,
              cantidad: cantidad,
              fecha: getUnixTime(fecha)
            }).then(navigate("/lista")).catch((error)=> console.log(error))
          } else {
            agregarGasto({
              categoria: categoria,
              descripcion: inputDescripcion,
              cantidad: cantidad,
              fecha: getUnixTime(fecha),
              uidUsuario: usuario.uid,
            })
              .then(() => {
                cambiarCategoria("hogar");
                cambiarInputDescripcion("");
                cambiarInputCantidad("");
                cambiarFecha(new Date());
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                  tipo: "exito",
                  mensaje: "El gasto fue ingresado correctamente",
                });
              })
              .catch((error) => {
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                  tipo: "error",
                  mensaje: "Hubo un problema al intentar agregar tu gasto.",
                });
              });
          }



    
      } else {
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: "error",
          mensaje: "Por favor, rellene todos los campos.",
        });
      }
    } else {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor, rellene todos los campos.",
      });
    }
  };

  return (
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias
          categoria={categoria}
          cambiarCategoria={cambiarCategoria}
        />
        <DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
      </ContenedorFiltros>

      <div>
        <Input
          type="text"
          name="descripcion"
          value={inputDescripcion}
          id="descripcion"
          placeholder="Descripcion"
          onChange={handleChange}
        />
        <InputGrande
          type="text"
          name="cantidad"
          value={inputCantidad}
          id="cantidad"
          placeholder="$0.00"
          onChange={handleChange}
        />
      </div>

      <ContenedorBoton>
        <Boton as="button" primario conIcono type="submit">
          {gasto ?  "Editar gasto" : "Agregar Gasto" } <IconoPlus />
        </Boton>
      </ContenedorBoton>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </Formulario>
  );
};

export default FormularioGasto;

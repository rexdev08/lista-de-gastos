import { db } from "../firebase/firebaseConfig.js";
import { addDoc, collection } from "firebase/firestore";

const agregarGasto = ({
  categoria,
  descripcion,
  cantidad,
  fecha,
  uidUsuario,
}) => {
  return addDoc(collection(db, "gastos"), {
    categoria: categoria,
    descripcion: descripcion,
    cantidad: Number(cantidad),
    fecha: Number(fecha),
    uidUsuario: uidUsuario,
  });
};

export default agregarGasto;

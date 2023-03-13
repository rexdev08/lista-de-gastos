import { db } from "../firebase/firebaseConfig.js";
import { doc, updateDoc } from "firebase/firestore";

const editarGasto = async ({ id, categoria, descripcion, cantidad, fecha }) => {
  const documento = doc(db, "gastos", id);

  return await updateDoc(documento, {
    categoria: categoria,
    descripcion: descripcion,
    cantidad: Number(cantidad),
    fecha: Number(fecha),
  });
};

export default editarGasto;

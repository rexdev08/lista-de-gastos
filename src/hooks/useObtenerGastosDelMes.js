import { getUnixTime, startOfMonth, endOfMonth } from "date-fns";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig.js";
import { useAuth } from "../contextos/AuthContex";

const useObtenerGastosDelMes = () => {
  const [gastos, establecerGastos] = useState([]);
  const { usuario } = useAuth();

  useEffect(() => {
    const inicioDeMes = getUnixTime(startOfMonth(new Date()));
    const finDeMes = getUnixTime(endOfMonth(new Date()));
    

    if (usuario) {
      const consulta = query(
        collection(db, "gastos"),
        orderBy("fecha", "desc"),
        where("fecha", ">=", inicioDeMes),
        where("fecha", "<=", finDeMes),
        where("uidUsuario", "==", usuario.uid)
      );

      const unsuscribe = onSnapshot(
        consulta,
        (snapshot) => {
          establecerGastos(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        },
        (error) => console.log(error)
      );

      return unsuscribe;
    }
  }, [usuario]);

  return gastos;
};

export default useObtenerGastosDelMes;

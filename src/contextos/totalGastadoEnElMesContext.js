import { useEffect, useContext, useState, createContext } from "react";
import useObtenerGastosDelMes from "../hooks/useObtenerGastosDelMes";
import React from 'react';

const totalGastadoContext = createContext();

const useTotalDelMes = () => useContext(totalGastadoContext);

const TotalGastadoProvider = ({ children }) => {
  const [total, cambiarTotal] = useState(0);
  const gastos = useObtenerGastosDelMes();

  useEffect(() => {
    let acumulado = 0;
    gastos.forEach((gasto) => {
      acumulado += gasto.cantidad;
    });

    cambiarTotal(acumulado)
  }, [gastos]);

  return (
    <totalGastadoContext.Provider value={{ total: total }}>
      {children}
    </totalGastadoContext.Provider>
  );
};

export { TotalGastadoProvider, useTotalDelMes };

// import {auth} from "../firebase/firebaseConfig.js";
import { useAuth } from "../contextos/AuthContex";
import { Navigate} from "react-router-dom"
import React from 'react';


const RutaProtegida = ({children}) => {
const {usuario} = useAuth();


if(usuario){
   return children
} else {
    return <Navigate replace to="/iniciar-sesion" />
}



       
}


export default RutaProtegida
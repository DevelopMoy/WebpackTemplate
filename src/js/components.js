/* MODULO DE NUESTRA APLICACION */

import '../css/stylesComp.css'

export const saludar = (nombre)=>{
    console.log("CREANDO ETIQUETA H1");
    const etiq = document.createElement("h1");
    etiq.innerText="HOLA "+nombre;
    document.querySelector("body").append(etiq);

    const funcTest = n => n*4;

    console.log(funcTest(4));
}

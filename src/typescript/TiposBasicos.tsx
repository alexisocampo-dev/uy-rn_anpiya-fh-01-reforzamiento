import React from "react";

export const TiposBasicos = () => {
  const nombre: string = "Alexis";
  const edad: number = 31;
  const estaActivo: boolean = false;
  const poderes: string[] = []; // "Velocidad", "Volar", "Respirar en el agua"

  return (
    <h3>
      {nombre}, {edad}, {estaActivo ? "activo" : "no activo"}
      <br />
      {poderes.join(", ")}
    </h3>
  );
};

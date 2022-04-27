import { useEffect, useRef, useState } from "react";
import { reqResApi } from "../api/reqRes";
import { ReqResListado, Usuario } from "../interfaces/reqRes";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const paginaRef = useRef(1);

  useEffect(() => {
    return () => {
      cargarUsuarios();
    };
  }, []);

  const cargarUsuarios = async () => {
    // llamado al API
    try {
      const res = await reqResApi.get<ReqResListado>("/users", {
        params: {
          page: paginaRef.current,
        },
      });
      if (res.data.data.length > 0) {
        setUsuarios(res.data.data);
      } else {
        paginaRef.current--;
        alert("No hay mas registros");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paginaSiguiente = () => {
    paginaRef.current++;
    cargarUsuarios();
  };
  const paginaAnterior = () => {
    if (paginaRef.current > 1) {
      paginaRef.current--;
      cargarUsuarios();
    }
  };

  return {
    usuarios,
    paginaAnterior,
    paginaSiguiente,
  };
};

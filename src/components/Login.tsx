import React, { useEffect, useReducer } from "react";

interface AuthState {
  validando: boolean;
  token: null | string;
  username: string;
  nombre: string;
}

type LoginPayload = {
  username: string;
  nombre: string;
};

type AuthAction =
  | {
      type: "logout";
    }
  | {
      type: "login";
      payload: LoginPayload;
    };

const initialState: AuthState = {
  validando: true,
  token: null,
  username: "",
  nombre: "",
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "logout":
      return {
        validando: false,
        token: null,
        username: "",
        nombre: "",
      };

    case "login":
      const { username, nombre } = action.payload;
      return {
        validando: false,
        token: "ABC123",
        username,
        nombre,
      };

    default:
      return state;
  }
};

export const Login = () => {
  const [{ validando, token, nombre }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "logout" });
    }, 1500);
  }, []);

  const login = () => {
    dispatch({
      type: "login",
      payload: { nombre: "Alexis", username: "al3xis" },
    });
  };

  const logout = () => {
    dispatch({
      type: "logout",
    });
  };

  if (validando) {
    return (
      <>
        <h3>Login</h3>
        <div className="alert alert-info">Validando...</div>
      </>
    );
  }

  return (
    <>
      <h3>Login</h3>
      {/* <div className="alert alert-info">Validando...</div> */}

      {token ? (
        <div className="alert alert-success">Autenticado como {nombre}</div>
      ) : (
        <div className="alert alert-danger">No Autenticado</div>
      )}

      {token ? (
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      ) : (
        <button className="btn btn-primary" onClick={login}>
          Login
        </button>
      )}
    </>
  );
};

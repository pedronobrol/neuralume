import * as React from "react";
import { Redirect, useRouteMatch } from "react-router-dom";

import { validateSession } from "../api/auth";
import { useHasValidSession, useValidateSession } from "../api/auth/hooks";

const AuthProvider: React.FC = ({ children }) => {
  const { loading, error, triggerReload } = useValidateSession();
  const hasValidSession = useHasValidSession();

  if (loading) return <p>Cargando... Por favor, espere</p>;

  if (error !== undefined) {
    return (
      <p>
        Ha ocurrido un error al conectarse con el servidor. Por favor, refresque
        la página e inténtelo de nuevo. ({error})
      </p>
    );
  }

  if (hasValidSession) return <>{children}</>;
  return <Redirect to="/auth" />;
};

export default AuthProvider;

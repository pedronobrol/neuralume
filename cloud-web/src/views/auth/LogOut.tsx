import * as React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logOut, RequestStatus } from "../../api";

const LogOut: React.FC = () => {
  const [status, setStatus] = React.useState<RequestStatus>({
    completed: false,
    success: false,
    errorMessage: null,
  });
  logOut()
    .then((response) =>
      setStatus({
        completed: true,
        success: response!.data!.revokeToken.success,
        errorMessage: null,
      })
    )
    .catch((reason) => {
      setStatus({
        completed: true,
        success: false,
        errorMessage: reason.message,
      });
    });
  if (status.completed) return <Redirect to="/auth" />;
  // While log out has not completed, we wait to redirect to auth,
  // since auth performs session validity checks, and we don't want conflicting
  // operations.
  return <></>;
};

export default LogOut;

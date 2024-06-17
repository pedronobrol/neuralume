import { AuthToken } from "./schema";

export const saveAuthToken = (payload: AuthToken) => {
  localStorage.setItem("token", payload.token);
  localStorage.setItem("refreshToken", payload.refreshToken);
};

export const clearAuthToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const getAuthToken = (): AuthToken | null => {
  const authToken = {
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
  if (
    typeof authToken.token === "string" &&
    typeof authToken.refreshToken === "string"
  ) {
    return authToken as AuthToken;
  }
  return null;
};

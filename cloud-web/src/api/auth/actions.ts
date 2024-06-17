import client from "./client";
import {
  REQUEST_TOKEN,
  VERIFY_TOKEN,
  REFRESH_TOKEN,
  REVOKE_TOKEN,
} from "./mutations";
import {
  VerifyTokenResponse,
  RequestTokenResponse,
  RefreshTokenResponse,
  RevokeTokenResponse,
  AuthToken,
} from "./schema";
import store from "../../store";
import { deleteSession, loadSession } from "../../reducers/session";
import { FetchResult } from "@apollo/client";
import { getAuthToken } from "./storage";

export interface VerifyTokenSignature {
  token: string;
}

export interface VerifyTokenResult {
  verifyToken: VerifyTokenResponse;
}

export const verifyToken = async (
  input: VerifyTokenSignature
): Promise<FetchResult<VerifyTokenResult>> => {
  return client.mutate<VerifyTokenResult, VerifyTokenSignature>({
    mutation: VERIFY_TOKEN,
    variables: input,
  });
};

export interface RequestTokenSignature {
  email: string;
  password: string;
}

export interface RequestTokenResult {
  requestToken: RequestTokenResponse;
}

export const requestToken = async (
  input: RequestTokenSignature
): Promise<FetchResult<RequestTokenResult>> => {
  const response = await client.mutate<
    RequestTokenResult,
    RequestTokenSignature
  >({
    mutation: REQUEST_TOKEN,
    variables: input,
  });
  if (response.data && response.data.requestToken.success) {
    const { authToken } = response.data.requestToken;
    store.dispatch(loadSession(authToken));
  }
  return response;
};

export interface RefreshTokenSignature {
  refreshToken: string;
}

export interface RefreshTokenResult {
  refreshToken: RefreshTokenResponse;
}

export const performRefreshToken = async (
  input: RefreshTokenSignature
): Promise<AuthToken | null> => {
  const response = await client.mutate<
    RefreshTokenResult,
    RefreshTokenSignature
  >({
    mutation: REFRESH_TOKEN,
    variables: input,
  });
  if (response.data && response.data.refreshToken.success) {
    return response.data.refreshToken.authToken || null;
  }
  return null;
};

export interface RevokeTokenSignature {
  refreshToken: string;
}

export interface RevokeTokenResult {
  revokeToken: RevokeTokenResponse;
}

export const logOut = async (): Promise<
  undefined | FetchResult<RevokeTokenResult>
> => {
  const { authToken } = store.getState().session;
  if (authToken) {
    const { refreshToken } = authToken;
    const response = await client.mutate<
      RevokeTokenResult,
      RevokeTokenSignature
    >({
      mutation: REVOKE_TOKEN,
      variables: { refreshToken },
    });
    store.dispatch(deleteSession());
    return response;
  }
};

export const validateSession = async (): Promise<AuthToken | null> => {
  const authToken =
    store.getState().session.authToken || (await getAuthToken());

  if (authToken !== null) {
    return updateSessionWithAuthToken(authToken);
  } else {
    return null;
  }
};

export const updateSessionWithAuthToken = (
  authToken: AuthToken
): Promise<AuthToken | null> => {
  return validateAuthToken(authToken).then((result) => {
    if (result !== null) {
      store.dispatch(loadSession(result));
      return result;
    } else {
      store.dispatch(deleteSession());
      return null;
    }
  });
};

export const validateAuthToken = (
  authToken: AuthToken
): Promise<AuthToken | null> => {
  const { token, refreshToken } = authToken;
  return verifyToken({ token }).then((result) => {
    if (result.data?.verifyToken.isValid) {
      return authToken;
    } else {
      return performRefreshToken({ refreshToken });
    }
  });
};

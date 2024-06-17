export interface AuthToken {
  token: string;
  refreshToken: string;
}

export type VerifyTokenResponse = {
  isValid: boolean;
  email?: string;
};

export type RequestTokenResponse = {
  success: boolean;
  errorMessage?: string;
  authToken?: AuthToken;
};

export type RevokeTokenResponse = {
  success: boolean;
  errorMessage?: string;
};

export type RefreshTokenResponse = RequestTokenResponse;

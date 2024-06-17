import gql from "graphql-tag";

export const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      success
      errorMessage
      authToken {
        token
        refreshToken
      }
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      isValid
    }
  }
`;

export const REQUEST_TOKEN = gql`
  mutation requestToken($email: String!, $password: String!) {
    requestToken(email: $email, password: $password) {
      success
      errorMessage
      authToken {
        token
        refreshToken
      }
    }
  }
`;

export const REVOKE_TOKEN = gql`
  mutation revokeToken($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      success
      errorMessage
    }
  }
`;

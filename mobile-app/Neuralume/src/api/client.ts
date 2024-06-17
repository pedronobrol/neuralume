import {ApolloClient, InMemoryCache, from, HttpLink} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {setContext} from '@apollo/client/link/context';
import {performRefreshToken, updateSessionWithAuthToken} from './auth';
import {TokenRefreshLink} from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import store from '../store';
import {AuthToken} from './auth/schema';
import {API_URL} from './config';

const errorLink = onError(
  // eslint-disable-next-line consistent-return
  ({graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.log(
          `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`,
        );
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
);

const refreshLink = new TokenRefreshLink({
  accessTokenField: 'authToken',
  isTokenValidOrUndefined: () => {
    const {authToken} = store.getState().session;
    if (authToken === null) {
      // console.log(`There is no token. Not refreshing`);
      return true;
    }
    const decodedToken = jwtDecode<{user: string; iat: string; exp: number}>(
      authToken.token,
    );
    console.log(`Token is ${JSON.stringify(decodedToken)}`);
    if (Date.now() >= decodedToken.exp * 1000) {
      // console.log('Token has expired');
      return false;
    } else {
      // console.log('Token has not expired');
      return true;
    }
  },
  fetchAccessToken: <any>(() => {
    const refreshToken = store.getState().session.authToken!.refreshToken;
    return performRefreshToken({refreshToken});
  }),
  handleFetch: (authToken: AuthToken) => updateSessionWithAuthToken(authToken),
  handleResponse: () => (authToken: AuthToken | null) => ({
    body: {
      authToken,
    },
  }),
});

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const {authToken} = store.getState().session;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken.token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: 'same-origin',
});

const link = from([errorLink, authLink, refreshLink, httpLink]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;

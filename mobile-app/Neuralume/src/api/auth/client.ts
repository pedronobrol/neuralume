import {
  ApolloClient,
  InMemoryCache,
  DefaultOptions,
  HttpLink,
} from '@apollo/client';
import {API_URL} from '../config';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: new HttpLink({
    uri: API_URL,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;

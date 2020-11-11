/* eslint-disable no-console */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import { JWT_STORAGE_KEY } from '@/constants/index';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('JWT_STORAGE_KEY');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );

      if (networkError) console.error(`[Network error]: ${networkError}`);

      if (graphQLErrors && graphQLErrors[0]) {
        const errors = graphQLErrors[0];
        switch (errors.extensions.code) {
          case 'UNAUTHENTICATED':
            localStorage.removeItem(JWT_STORAGE_KEY);
            window.location.href = '/signin';
            break;
          // handle other errors
          case 'ANOTHER_ERROR_CODE':
            console.error('cc');
            break;
          default:
        }
      }
    }),
    createUploadLink({
      uri: process.env.REACT_APP_GRAPHQL_URL,
      credentials: 'include',
    }),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;

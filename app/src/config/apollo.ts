// Apollo GraphQL client

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import {createNetworkStatusNotifier} from 'react-apollo-network-status';

// ----------------------------------------------------------------------------

export const {
  link: networkStatusNotifierLink,
  useApolloNetworkStatus,
} = createNetworkStatusNotifier();

export function createClient(): ApolloClient<NormalizedCacheObject> {
  // Create the cache first, which we'll share across Apollo tooling.
  // This is an in-memory cache. Since we'll be calling `createClient` on
  // universally, the cache will survive until the HTTP request is
  // responded to (on the server) or for the whole of the user's visit (in
  // the browser)
  const cache = new InMemoryCache();

  // Create a HTTP client (both server/client). It takes the GraphQL
  // server from the `GRAPHQL` environment variable, which by default is
  // set to an external playground at https://graphqlhub.com/graphql
  const httpLink = new HttpLink({
    credentials: 'include',
    uri: process.env.REACT_APP_GRAPHQL_URL,
  });

  // Return a new Apollo Client back, with the cache we've just created,
  // and an array of 'links' (Apollo parlance for GraphQL middleware)
  // to tell Apollo how to handle GraphQL requests
  return new ApolloClient({
    cache,
    link: ApolloLink.from([
      // General error handler, to log errors back to the console.
      // Replace this in production with whatever makes sense in your
      // environment. Remember you can use the global `SERVER` variable to
      // determine whether you're running on the server, and record errors
      // out to third-party services, etc
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
          const errors = graphQLErrors[0];
          switch (errors.extensions?.code) {
            case 'UNAUTHENTICATED':
              if (!window.location.pathname.startsWith('/auth')) {
                window.location.href = '/auth/signin';
              }
              break;
            case 'ANOTHER_ERROR_CODE':
              break;
            default:
          }
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }),

      // Split on HTTP and WebSockets
      httpLink,
    ]),
    credentials: "include"
  });
}
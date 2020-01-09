import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-boost';
import { from, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { TokenContext } from '../context';

export const LetheApolloClient = ({ children }) => {
  const { token, setToken } = React.useContext(TokenContext);

  React.useEffect(() => {
    if (!token) {
      AsyncStorage.getItem('@letheStore:token').then(authToken => {
        if (authToken) {
          return setToken(authToken);
        }
        return Promise.resolve();
      });
    }
  }, [token]);

  // if (!token) {
  //   AsyncStorage.getItem('@letheStore:token').then(authToken => {
  //     if (authToken) {
  //       return setToken(authToken);
  //     }
  //     return Promise.resolve();
  //   });
  // }

  const httpLink = createUploadLink({
    // const httpLink = createHttpLink({
    // android
    // uri: 'http://10.0.3.2:9999/graphql',
    // ios
    uri: 'http://localhost:9999/graphql',
    // now
    // uri: 'https://letheapi-drnljuhskx.now.sh/graphql',
  });

  const wsLink = new WebSocketLink({
    // android
    // uri: 'wss://10.0.3.2:9999/subscriptions',
    // ios
    uri: 'wss://localhost:9999/subscriptions',
    // now
    // uri: `wss://letheapi-drnljuhskx.now.sh/subscriptions`,
    options: {
      reconnect: true,
      connectionParams: {
        token,
      },
    },
  });

  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  const authLink = setContext(async (_, { headers }) => {
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    }
    return null;
  });

  const link = from([authLink, terminatingLink]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

LetheApolloClient.defaultProps = {
  children: () => {},
};

LetheApolloClient.propTypes = {
  children: PropTypes.node,
};
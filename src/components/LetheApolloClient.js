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
import getEnvVars from '../../environment';

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

  const { apiUrl, uri } = getEnvVars();

  console.log('uri: ', uri);

  let httpUri;
  let wssUri;
  switch (uri) {
    case 'android':
      httpUri = 'http://10.0.3.2:9999/graphql';
      wssUri = 'http://10.0.3.2:9999/subscriptions';
      break;
    case 'ios':
      httpUri = 'http://localhost:9999/graphql';
      wssUri = 'http://localhost:9999/subscriptions';
      break;
    case 'now':
      httpUri = 'https://letheapi-drnljuhskx.now.sh/graphql';
      wssUri = 'https://letheapi-drnljuhskx.now.sh/subscriptions';
      break;
    case 'docker':
      httpUri = 'http://develop.localhost/graphql';
      wssUri = 'http://develop.localhost/subscriptions';
      break;
    case 'heroku':
      httpUri = 'https://letheapi.herokuapp.com/graphql';
      wssUri = 'https://letheapi.herokuapp.com/subscriptions';
      break;
    case 'androidIos':
      httpUri = `http://${apiUrl}graphql`;
      wssUri = `http://${apiUrl}subscriptions`;
      break;
    default:
      break;
  }

  const httpLink = createUploadLink({
    uri: httpUri,
  });

  const wsLink = new WebSocketLink({
    uri: wssUri,
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

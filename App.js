/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import NativeTachyons from 'react-native-style-tachyons';
import { AsyncStorage, StyleSheet } from 'react-native';
import { Root } from 'native-base';
import Expo from 'expo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable, from, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
import { TokenProvider, TokenContext } from './src/context';
import { Navigator } from './src/navigator';
import { WebSocketLink } from 'apollo-link-ws';

NativeTachyons.build(
  {
    colors: {
      palette: {
        white: '#FFFFFF',
        offWhite: '#e1e1e1',
        ltext: '#666',
      },
    },
  },
  StyleSheet,
);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  async componentWillMount() {
    await Expo.Asset.fromModule(
      require('./src/images/brian.png'),
      require('./src/images/background.png'),
      require('./src/images/defaultProfile.jpg'),
    ).downloadAsync();
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Root>
        <TokenProvider>
          <TokenContext.Consumer>
            {({ token, setToken }) => {
              if (!token) {
                AsyncStorage.getItem('@letheStore:token').then(authToken => {
                  if (authToken) {
                    return setToken(authToken);
                  }
                  return Promise.resolve();
                });
              }

              const httpLink = createUploadLink({
                // const httpLink = createHttpLink({
                // android
                // uri: 'http://10.0.3.2:9999/graphql',
                // ios
                // uri: 'http://localhost:9999/graphql',
                uri: 'https://letheapi-nibuzervea.now.sh/graphql',
              });

              const wsLink = new WebSocketLink({
                // android
                // uri: 'wss://10.0.3.2:9999/subscriptions',
                // ios
                // uri: 'wss://localhost:9999/subscriptions',
                // now
                uri: `wss://letheapi-nibuzervea.now.sh/subscriptions`,
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
                  return (
                    kind === 'OperationDefinition' &&
                    operation === 'subscription'
                  );
                },
                wsLink,
                httpLink,
              );

              const authLink = setContext(async (_, { headers }) => {
                // await AsyncStorage.removeItem('@letheStore:token');
                if (token) {
                  return {
                    headers: {
                      ...headers,
                      authorization: `Bearer ${token}`,
                    },
                  };
                }
              });

              const link = from([authLink, /* errorLink, */ terminatingLink]);

              const client = new ApolloClient({
                link,
                cache: new InMemoryCache(),
              });
              return (
                <ApolloProvider client={client}>
                  <Navigator />
                </ApolloProvider>
              );
            }}
          </TokenContext.Consumer>
        </TokenProvider>
      </Root>
    );
  }
}

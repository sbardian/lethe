import React, { Component } from 'react';
import NativeTachyons from 'react-native-style-tachyons';
import { AsyncStorage, StyleSheet } from 'react-native';
import { Root } from 'native-base';
import Expo from 'expo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { TokenProvider, TokenContext } from './src/context';
import { Navigator } from './src/navigator';

NativeTachyons.build({}, StyleSheet);

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
              const httpLink = createHttpLink({
                // android
                //  uri: 'http://10.0.3.2:9999/graphql',
                // ios
                uri: 'http://localhost:9999/graphql',
              });
              const authLink = setContext(async (_, { headers }) => {
                const authToken =
                  token ||
                  (await AsyncStorage.getItem('@letheStore:token')) ||
                  undefined;
                // TODO: setToken here causing issues. . . loop, fix dumas
                // setToken(authToken);
                // return the headers to the context so httpLink can read them
                return {
                  headers: {
                    ...headers,
                    authorization: authToken ? `Bearer ${authToken}` : '',
                  },
                };
              });
              const client = new ApolloClient({
                link: authLink.concat(httpLink),
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

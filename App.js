import React, { Component } from 'react';
import NativeTachyons from 'react-native-style-tachyons';
import { AsyncStorage, StyleSheet } from 'react-native';
import { Root } from 'native-base';
import Expo from 'expo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { TokenProvider, TokenContext } from './src/context';
import { Navigator } from './src/navigator';

NativeTachyons.build(
  {
    colors: {
      palette: {
        white: '#FFFFFF',
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
                // uri: 'http://localhost:9999/graphql',
                uri: 'https://letheapi-gsooqfdffu.now.sh/graphql',
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

              const errorLink = onError(
                ({ graphQLErrors, networkError, response }) => {
                  if (graphQLErrors)
                    graphQLErrors.map(({ message, locations, path }) => {
                      console.log(
                        `YOOOO: [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Response: ${response}<<<END>>>`,
                      );
                      return message;
                    });
                  if (networkError)
                    console.log(`[Network error]: ${networkError}`);
                  console.log(
                    'GOT AN ERROR ITS NOT GQL OR NETWORK!: ',
                    response,
                  );
                },
              );

              // const link = ApolloLink.concat(httpLink, authLink, errorLink);

              const client = new ApolloClient({
                link: authLink.concat(httpLink, errorLink),
                // link: ApolloLink.from([httpLink, authLink, errorLink]),
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

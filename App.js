/* eslint-disable class-methods-use-this */
/* eslint-disable global-require */
import React from 'react';
import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';
import { Root } from 'native-base';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { TokenProvider } from './src/context';
import { LetheApolloClient } from './src/components/LetheApolloClient';
import { AppContainer } from './src/navigator';

NativeTachyons.build(
  {
    colors: {
      palette: {
        white: '#FFFFFF',
        offWhite: '#e1e1e1',
        green: '#BFEB88',
        ltext: '#666',
      },
    },
  },
  StyleSheet,
);

export default () => {
  const [isReady, setIsReady] = React.useState(false);

  const loadFontsAsync = () =>
    Font.loadAsync({
      // Roboto fonts are required for native-base and pre-loading them here
      // avoids a potential race condition of attempting to render some NB
      // component before the fonts have been loaded.
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });

  const handleLoadingFailure = (err) => {
    // TODO: report to error service?
    // eslint-disable-next-line no-console
    console.error(err);
  };

  const handleLoadingSuccess = () => setIsReady(true);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFontsAsync}
        onError={handleLoadingFailure}
        onFinish={handleLoadingSuccess}
      />
    );
  }

  return (
    <Root>
      <TokenProvider>
        <LetheApolloClient>
          <AppContainer />
        </LetheApolloClient>
      </TokenProvider>
    </Root>
  );
};

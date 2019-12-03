/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Text } from 'native-base';
import { Screen } from './Screen';

export const SignupScreen = () => (
  <Screen showHeader={false}>
    <Text style={{ marginTop: 88 }}>Sign up</Text>
  </Screen>
);

SignupScreen.navigationOptions = {
  title: 'Sign Up',
  headerStyle: {
    backgroundColor: '#8CD19D',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

SignupScreen.displayName = 'SignupScreen';

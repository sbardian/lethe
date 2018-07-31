/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Text } from 'native-base';
import { Screen } from './Screen';

export class SignupScreen extends Component {
  render() {
    return (
      <Screen showHeader={false}>
        <Text style={{ marginTop: 88 }}>Sign up</Text>
      </Screen>
    );
  }
}

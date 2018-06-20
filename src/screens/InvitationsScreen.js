/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Row, Grid } from 'react-native-easy-grid';
import { Invitations } from '../components';
import { Screen } from '../screens';

export class InvitationsScreen extends Component {
  static navigationOptions = {
    title: 'Invitations',
    headerStyle: {
      backgroundColor: '#ec4401',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <Screen>
        <Invitations />
      </Screen>
    );
  }
}

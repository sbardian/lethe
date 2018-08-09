/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Invitations } from '../components';
import { Screen } from './Screen';

export class InvitationsScreen extends Component {
  static navigationOptions = {
    title: 'Invitations',
    headerStyle: {
      backgroundColor: '#FCB653',
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

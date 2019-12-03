/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Invitations } from '../components';
import { Screen } from './Screen';

export const InvitationsScreen = () => (
  <Screen>
    <Invitations />
  </Screen>
);

InvitationsScreen.navigationOptions = {
  title: 'Invitations',
  headerStyle: {
    backgroundColor: '#FCB653',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

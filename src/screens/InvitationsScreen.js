/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
} from 'native-base';
import { Invitations } from '../components';
import { Screen } from '../screens';

export class InvitationsScreen extends Component {
  render() {
    return (
      <Screen
        headerButtonAction={() => this.props.navigation.toggleDrawer()}
        headerIcon={<Icon name="menu" />}
        headerTitle="Home"
      >
        <Invitations />
      </Screen>
    );
  }
}

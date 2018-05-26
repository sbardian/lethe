/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  Button,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
} from 'native-base';
import { Lists } from '../components';
import { Screen } from '../screens';

export class ListsScreen extends Component {
  render() {
    return (
      <Screen
        headerButtonAction={() => this.props.navigation.toggleDrawer()}
        headerIcon={<Icon name="menu" />}
        headerTitle="Home"
      >
        <Lists />
      </Screen>
    );
  }
}

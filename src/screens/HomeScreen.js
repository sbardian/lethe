/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Icon } from 'native-base';
import { MyInfo } from '../components';
import { Screen } from '../screens';

export class HomeScreen extends Component {
  render() {
    return (
      <Screen
        headerButtonAction={() => this.props.navigation.toggleDrawer()}
        headerIcon={<Icon name="menu" />}
        headerTitle="Home"
      >
        <MyInfo />
      </Screen>
    );
  }
}

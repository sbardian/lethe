/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { ListSettings } from '../components';
import { Screen } from '../screens';

export class ListSettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: '#13cd4a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { navigation } = this.props;
    const listId = navigation.getParam('listId');
    const title = navigation.getParam('title');
    return (
      <Screen>
        <ListSettings title={title} listId={listId} navigation={navigation} />
      </Screen>
    );
  }
}

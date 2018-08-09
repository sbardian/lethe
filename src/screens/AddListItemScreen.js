/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { AddListItemForm } from '../components';
import { Screen } from './Screen';

export class AddListItemScreen extends Component {
  static navigationOptions = {
    title: 'Add List Item',
    headerStyle: {
      backgroundColor: '#5CACC4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { navigation } = this.props;
    const listId = navigation.getParam('listId');
    return (
      <Screen>
        <AddListItemForm listId={listId} navigation={navigation} />
      </Screen>
    );
  }
}

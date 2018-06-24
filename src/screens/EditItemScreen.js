/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { EditItemForm } from '../components';
import { Screen } from '../screens';

export class EditItemScreen extends Component {
  static navigationOptions = {
    title: 'Edit Item',
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
    const item = navigation.getParam('item');
    return (
      <Screen>
        <EditItemForm listId={listId} item={item} navigation={navigation} />
      </Screen>
    );
  }
}

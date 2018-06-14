/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { AddListItemForm } from '../components';
import { Screen } from '../screens';

export class AddListItemScreen extends Component {
  static navigationOptions = {
    title: 'Add List Item',
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
    const list = navigation.getParam('list', {
      list: { id: '0', title: 'No List' },
    });
    return (
      <Screen>
        <AddListItemForm list={list} navigation={navigation} />
      </Screen>
    );
  }
}

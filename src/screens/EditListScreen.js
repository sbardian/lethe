/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { EditListForm } from '../components';
import { Screen } from '../screens';

export class EditListScreen extends Component {
  static navigationOptions = {
    title: 'Edit List',
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
      list: { id: 'No List', title: 'No List' },
    });
    return (
      <Screen>
        <EditListForm list={list} navigation={navigation} />
      </Screen>
    );
  }
}

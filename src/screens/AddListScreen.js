/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { AddListForm } from '../components';
import { Screen } from '../screens';

export class AddListScreen extends Component {
  static navigationOptions = {
    title: 'Add List',
    headerStyle: {
      backgroundColor: '#13cd4a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <Screen>
        <AddListForm navigation={this.props.navigation} />
      </Screen>
    );
  }
}

/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { AddListForm } from '../components';
import { Screen } from './Screen';

export class AddListScreen extends Component {
  static navigationOptions = {
    title: 'Add List',
    headerStyle: {
      backgroundColor: '#8CD19D',
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

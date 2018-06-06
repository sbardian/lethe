/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { SendInvitationForm } from '../components';
import { Screen } from '../screens';

export class SendInvitationScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#ec4401',
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
        <SendInvitationForm list={list} navigation={navigation} />
      </Screen>
    );
  }
}

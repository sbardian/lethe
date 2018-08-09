/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { SendInvitationForm } from '../components';
import { Screen } from './Screen';

export class SendInvitationScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#FF5254',
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
        <SendInvitationForm listId={listId} navigation={navigation} />
      </Screen>
    );
  }
}

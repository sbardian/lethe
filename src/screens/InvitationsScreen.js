/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Text } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { Invitations } from '../components';
import { Screen } from '../screens';

export class InvitationsScreen extends Component {
  static navigationOptions = {
    title: 'Invitations',
    headerStyle: {
      backgroundColor: '#992F43',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <Screen>
        <Grid>
          <Row>
            <Text>Invitations</Text>
            <Invitations />
          </Row>
        </Grid>
      </Screen>
    );
  }
}

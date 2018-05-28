/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Row, Grid } from 'react-native-easy-grid';
import { Lists } from '../components';
import { Screen } from '../screens';
import { AddListFab } from '../components';

export class ListsScreen extends Component {
  static navigationOptions = {
    title: 'Lists',
    headerStyle: {
      backgroundColor: '#BAD500',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <Screen fab={<AddListFab />}>
        <Grid>
          <Row>
            <Lists />
          </Row>
        </Grid>
      </Screen>
    );
  }
}

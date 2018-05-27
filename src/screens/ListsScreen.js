/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Text } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { Lists } from '../components';
import { Screen } from '../screens';

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
      <Screen>
        <Grid>
          <Row>
            <Text>Lists</Text>
            <Lists />
          </Row>
        </Grid>
      </Screen>
    );
  }
}

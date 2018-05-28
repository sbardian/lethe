/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Text } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { Screen } from '../screens';

export class AddListScreen extends Component {
  static navigationOptions = {
    title: 'Add List',
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
            <Text>Add List</Text>
          </Row>
        </Grid>
      </Screen>
    );
  }
}

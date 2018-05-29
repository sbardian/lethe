/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Row, Grid } from 'react-native-easy-grid';
import { AddListFab, Lists } from '../components';
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
      <Screen fab={<AddListFab navigation={this.props.navigation} />}>
        <Grid>
          <Row>
            <Lists />
          </Row>
        </Grid>
      </Screen>
    );
  }
}

/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Row, Grid } from 'react-native-easy-grid';
import { Profile } from '../components';
import { Screen } from '../screens';

export class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#6A8289',
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
            <Profile navigation={this.props.navigation} />
          </Row>
        </Grid>
      </Screen>
    );
  }
}

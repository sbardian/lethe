/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Fab, Icon } from 'native-base';
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
      <Screen
        fab={
          <Fab
            style={{ backgroundColor: '#BAD500' }}
            position="bottomRight"
            onPress={() => {
              console.log('add list');
            }}
          >
            <Icon name="add" />
          </Fab>
        }
      >
        <Grid>
          <Row>
            <Lists />
          </Row>
        </Grid>
      </Screen>
    );
  }
}

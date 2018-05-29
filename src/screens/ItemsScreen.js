/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Text } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { AddListFab } from '../components';
import { Screen } from '../screens';

export class ItemsScreen extends Component {
  static navigationOptions = {
    title: 'Items',
    headerStyle: {
      backgroundColor: '#BAD500',
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
      <Screen fab={<AddListFab navigation={this.props.navigation} />}>
        <Grid>
          <Row>
            <Text>{list.title} list items: </Text>
          </Row>
        </Grid>
      </Screen>
    );
  }
}

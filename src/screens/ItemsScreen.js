/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Text } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { ItemsFab } from '../components';
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

  constructor(props) {
    super(props);
    this.state = {
      list: { id: 'No List', title: 'No List' },
    };
  }

  static getDerivedStateFromProps(props) {
    const { navigation } = props;
    const list = navigation.getParam('list');
    if (list) {
      return {
        list,
      };
    }
  }

  render() {
    const { navigation } = this.props;
    const { list } = this.state;
    return (
      <Screen fab={<ItemsFab navigation={navigation} list={list} />}>
        <Grid>
          <Row>
            <Text>{list.title} list items: </Text>
          </Row>
        </Grid>
      </Screen>
    );
  }
}

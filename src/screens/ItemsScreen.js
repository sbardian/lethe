/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { AddItemFab, Items } from '../components';
import { Screen } from './Screen';

export class ItemsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const listId = navigation.getParam('listId');
    const title = navigation.getParam('title');
    return {
      headerStyle: {
        backgroundColor: '#FF5254',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <Button
          transparent
          onPress={() =>
            navigation.navigate('ListSettings', {
              listId,
              title,
            })
          }
          title="Info"
          color="#fff"
        >
          <Icon style={{ color: 'white' }} name="settings" type="Octicons" />
        </Button>
      ),
    };
  };

  render() {
    const { navigation } = this.props;
    const listId = navigation.getParam('listId');
    return (
      <Screen fab={<AddItemFab navigation={navigation} listId={listId} />}>
        <Grid>
          <Row>
            <Items listId={listId} navigation={navigation} />
          </Row>
        </Grid>
      </Screen>
    );
  }
}

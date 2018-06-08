/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Text, Button, Icon } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { ItemsFab, Items } from '../components';
import { Screen } from '../screens';

export class ItemsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const list = navigation.getParam('list');
    return {
      headerStyle: {
        backgroundColor: '#660066',
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
              list,
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
    return null;
  }

  render() {
    const { navigation } = this.props;
    const { list } = this.state;
    return (
      <Screen fab={<ItemsFab navigation={navigation} list={list} />}>
        <Grid>
          <Row>
            <Items listId={list.id} navigation={navigation} />
          </Row>
        </Grid>
      </Screen>
    );
  }
}

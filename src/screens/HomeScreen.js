/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import { Icon, Text } from 'native-base';
import { Screen } from '../screens';

export class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#DE2439',
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
          <Row
            onPress={() => this.props.navigation.navigate('Profile')}
            style={{ backgroundColor: '#F6B10B' }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                type="FontAwesome"
                name="user-circle-o"
                style={{ color: 'white', fontSize: 64 }}
              />
              <Text style={{ color: 'white', fontSize: 24 }}>Profile</Text>
            </View>
          </Row>

          <Row
            onPress={() => this.props.navigation.navigate('Lists')}
            style={{ backgroundColor: '#BAD500' }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                type="Feather"
                name="list"
                style={{ color: 'white', fontSize: 64 }}
              />
              <Text style={{ color: 'white', fontSize: 24 }}>Lists</Text>
            </View>
          </Row>

          <Row
            onPress={() => this.props.navigation.navigate('Invitations')}
            style={{ backgroundColor: '#992F43' }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                type="MaterialIcons"
                name="insert-invitation"
                style={{ color: 'white', fontSize: 64 }}
              />
              <Text style={{ color: 'white', fontSize: 24 }}>Invitations</Text>
            </View>
          </Row>
        </Grid>
      </Screen>
    );
  }
}

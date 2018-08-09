/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';
import { Row, Grid } from 'react-native-easy-grid';
import { Button, Container, Content, Icon, Text } from 'native-base';
import { TokenContext } from '../context';

export class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#5e525c',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <TokenContext.Consumer>
          {({ removeToken }) => {
            return (
              <Button
                transparent
                onPress={() => {
                  removeToken();
                  navigation.navigate('Login');
                  return null;
                }}
                title="Info"
                color="#fff"
              >
                <Icon
                  style={{ color: 'white' }}
                  name="logout"
                  type="SimpleLineIcons"
                />
              </Button>
            );
          }}
        </TokenContext.Consumer>
      ),
    };
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Grid>
            <Row
              onPress={() => this.props.navigation.navigate('Profile')}
              style={{ backgroundColor: '#5CACC4' }}
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
              style={{ backgroundColor: '#8CD19D' }}
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
              style={{ backgroundColor: '#FF5254' }}
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
                <Text style={{ color: 'white', fontSize: 24 }}>
                  Invitations
                </Text>
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

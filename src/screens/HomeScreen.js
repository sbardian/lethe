/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client';
import { Row, Grid } from 'react-native-easy-grid';
import { Button, Container, Content, Icon, Text } from 'native-base';
import { TokenContext } from '../context';

const GET_MESSAGES = gql`
  subscription {
    message {
      message
    }
  }
`;

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
          <Subscription subscription={GET_MESSAGES}>
            {({ data: { commentAdded }, loading }) => (
              <h4>New comment: {!loading && commentAdded.content}</h4>
            )}
          </Subscription>
          <Grid>
            <Row
              onPress={() => this.props.navigation.navigate('Profile')}
              style={{ backgroundColor: '#7b6ed6' }}
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
              style={{ backgroundColor: '#13cd4a' }}
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
              style={{ backgroundColor: '#ec4401' }}
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

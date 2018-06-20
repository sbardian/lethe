/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Icon, Text } from 'native-base';

export class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#5e525c',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
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

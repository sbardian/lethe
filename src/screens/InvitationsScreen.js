/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
} from 'native-base';
import { Invitations } from '../components';

export class InvitationsScreen extends Component {
  render() {
    return (
      <Container>
        <StatusBar />
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Invitations</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Invitations />
        </Content>
      </Container>
    );
  }
}

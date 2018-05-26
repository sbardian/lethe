/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  Button,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
} from 'native-base';
import { Lists } from '../components';

export class ListsScreen extends Component {
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
            <Title>Lists</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Lists />
        </Content>
      </Container>
    );
  }
}

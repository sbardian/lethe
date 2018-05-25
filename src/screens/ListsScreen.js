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

export class ListsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'default',
    };
  }

  componentDidMount() {}

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
            <Title>ListScreen</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Text>ListScreen</Text>
          <Text>{this.state.token}</Text>
        </Content>
      </Container>
    );
  }
}

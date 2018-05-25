/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Form,
  Header,
  Input,
  Item,
  Title,
  Left,
  Icon,
  Right,
} from 'native-base';

export class LoginScreen extends Component {
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
            <Title>LoginScreen</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Text>LoginScreen</Text>
          <Form>
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

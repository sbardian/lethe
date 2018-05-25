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
  Label,
} from 'native-base';
import { tokenContext } from '../context';

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'notLoggedIn',
    };
  }

  componentDidMount() {
    // TODO: get token from localstorage?
  }

  onChange() {
    // TODO: update state with username and password as they are entered
  }

  login() {
    // TODO: get form values from state after we set them
    // TODO: set state with token returned
  }

  render() {
    return (
      <tokenContext.Provider value={this.state.token}>
        <tokenContext.Consumer>
          {({ token }) =>
            this.state.token === 'loggedIn' ? (
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
                  <Text>{this.state.token}</Text>
                </Content>
              </Container>
            ) : (
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
                    <Item floatingLabel>
                      <Label>Username</Label>
                      <Input />
                    </Item>
                    <Item floatingLabel last>
                      <Label>Password</Label>
                      <Input secureTextEntry />
                    </Item>
                  </Form>
                  <Button onClick={() => this.login()} />
                  <Text>{this.state.token}</Text>
                </Content>
              </Container>
            )
          }
        </tokenContext.Consumer>
      </tokenContext.Provider>
    );
  }
}

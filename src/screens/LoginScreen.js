/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Text, Form, Input, Item, Icon, Label } from 'native-base';
import { TokenContext } from '../context';
import { Screen } from '../screens';

const LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      token
    }
  }
`;

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'notLoggedIn',
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    // TODO: check for token in localstorage and set state?
  }

  onUsernameChange(value) {
    console.log('username value = ', value);
    this.setState({
      username: value,
    });
  }

  onPasswordChange(value) {
    console.log('password value = ', value);
    this.setState({
      password: value,
    });
  }

  render() {
    return (
      <TokenContext.Consumer>
        {({ token, setToken }) => {
          if (token) {
            console.log('token update in login');
            this.props.navigation.navigate('Home');
            return null;
          }
          return (
            <Screen
              headerButtonAction={() => this.props.navigation.toggleDrawer()}
              headerIcon={<Icon name="menu" />}
              headerTitle="Home"
            >
              <Text>LoginScreen</Text>
              <Form>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input
                    id="username"
                    onChangeText={value => this.onUsernameChange(value)}
                  />
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input
                    id="password"
                    secureTextEntry
                    onChangeText={value => this.onPasswordChange(value)}
                  />
                </Item>
              </Form>
              <Mutation
                mutation={LOGIN}
                onCompleted={data => setToken(data.login.token)}
              >
                {(userLogin, { loading }) => (
                  <Button
                    disabled={loading}
                    onPress={async () => {
                      await userLogin({
                        variables: {
                          username: this.state.username,
                          password: this.state.password,
                        },
                      });
                    }}
                  >
                    <Text>Login</Text>
                  </Button>
                )}
              </Mutation>
              <Text>{this.state.token}</Text>
            </Screen>
          );
        }}
      </TokenContext.Consumer>
    );
  }
}

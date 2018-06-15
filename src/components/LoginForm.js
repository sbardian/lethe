import React, { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Text, Form, Input, Item, Label } from 'native-base';

const LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      token
    }
  }
`;

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onUsernameChange(value) {
    this.setState({
      username: value,
    });
  }

  onPasswordChange(value) {
    this.setState({
      password: value,
    });
  }

  render() {
    return (
      <View>
        <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>Username</Label>
            <Input
              style={{ color: 'white' }}
              id="username"
              value={this.state.username}
              autoCapitalize="none"
              onChangeText={value => this.onUsernameChange(value)}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>Password</Label>
            <Input
              style={{ color: 'white' }}
              id="password"
              value={this.state.password}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={value => this.onPasswordChange(value)}
            />
          </Item>
        </Form>
        <Mutation
          mutation={LOGIN}
          errorPolicy="all"
          onCompleted={data => this.props.onSetToken(data.login.token)}
          onError={error => console.log('Login error: ', error)}
        >
          {(userLogin, { loading, error }) => (
            <View>
              <Button
                block
                light
                style={{ marginRight: 20, marginLeft: 20, marginBottom: 20 }}
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
              {error && (
                <Text style={{ color: 'white', alignSelf: 'center' }}>
                  {error.message}
                </Text>
              )}
            </View>
          )}
        </Mutation>
      </View>
    );
  }
}

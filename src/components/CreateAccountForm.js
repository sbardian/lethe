import React, { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Text, Form, Input, Item, Label } from 'native-base';

const SIGN_UP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signup(
      signupInput: { username: $username, email: $email, password: $password }
    ) {
      token
    }
  }
`;

export class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConf: '',
    };
  }

  onEmailChange(value) {
    this.setState({
      email: value,
    });
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

  onPasswordConfChange(value) {
    this.setState({
      passwordConf: value,
    });
  }

  render() {
    let valid = true;
    const { username, email, password, passwordConf } = this.state;
    return (
      <View>
        <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>Username</Label>
            <Input
              style={{ color: 'white' }}
              id="username"
              autoCapitalize="none"
              onChangeText={value => this.onUsernameChange(value)}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>Email</Label>
            <Input
              style={{ color: 'white' }}
              id="email"
              autoCapitalize="none"
              onChangeText={value => this.onEmailChange(value)}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>Password</Label>
            <Input
              style={{ color: 'white' }}
              id="password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={value => this.onPasswordChange(value)}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>Password Confirmation</Label>
            <Input
              style={{ color: 'white' }}
              id="password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={value => this.onPasswordConfChange(value)}
            />
          </Item>
        </Form>
        <Mutation
          mutation={SIGN_UP}
          onCompleted={data => this.props.onSetToken(data.signup.token)}
        >
          {(signUp, { loading }) => {
            if (
              username &&
              email &&
              password &&
              passwordConf &&
              password === passwordConf
            ) {
              valid = false;
            }
            return (
              <Button
                block
                light
                style={{ marginRight: 20, marginLeft: 20 }}
                disabled={valid}
                onPress={async () => {
                  await signUp({
                    variables: {
                      username: this.state.username,
                      email: this.state.email,
                      password: this.state.password,
                    },
                  });
                }}
              >
                <Text>Create Account</Text>
              </Button>
            );
          }}
        </Mutation>
      </View>
    );
  }
}

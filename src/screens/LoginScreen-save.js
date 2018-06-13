/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { View } from 'react-native';
import { Button, Text, Form, Input, Item, Label, Thumbnail } from 'native-base';
import { TokenContext } from '../context';
import { Screen } from '../screens';

const LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      token
    }
  }
`;

const screenStyles = {
  screen: {
    backgroundColor: '#1A1A1A',
  },
};

export class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#5e525c',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

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
      <TokenContext.Consumer>
        {({ token, setToken }) => {
          if (token) {
            console.log('token update in login');
            this.props.navigation.navigate('Home');
            return null;
          }
          return (
            <Screen screenStyles={screenStyles.screen}>
              <View style={{ alignSelf: 'center' }}>
                <Thumbnail
                  style={{
                    width: 200,
                    height: 200,
                    padding: 50,
                    marginTop: 88,
                  }}
                  source={require('../images/brian.png')}
                />
              </View>
              <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
                <Item stackedLabel>
                  <Label>Username</Label>
                  <Input
                    style={{ color: 'white' }}
                    id="username"
                    onChangeText={value => this.onUsernameChange(value)}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Password</Label>
                  <Input
                    style={{ color: 'white' }}
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
                    full
                    light
                    bordered
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
              <Button
                full
                light
                bordered
                style={{ marginTop: 20 }}
                onPress={() => this.props.navigation.navigate('Signup')}
              >
                <Text>Sign Up</Text>
              </Button>
            </Screen>
          );
        }}
      </TokenContext.Consumer>
    );
  }
}

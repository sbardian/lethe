/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { View } from 'react-native';
import {
  Button,
  Text,
  Form,
  Input,
  Item,
  Icon,
  Label,
  Thumbnail,
  Grid,
  Row,
} from 'native-base';
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
    backgroundColor: 'black',
  },
};

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
              showHeader={false}
              headerIcon={<Icon name="menu" />}
              headerTitle="Login"
              screenStyles={screenStyles.screen}
            >
              <View style={{ alignSelf: 'center' }}>
                <Thumbnail
                  style={{
                    width: 200,
                    height: 200,
                    padding: 50,
                    marginTop: 100,
                  }}
                  source={require('../images/brian.png')}
                />
              </View>
              <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input
                    style={{ color: 'white' }}
                    id="username"
                    onChangeText={value => this.onUsernameChange(value)}
                  />
                </Item>
                <Item floatingLabel>
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
            </Screen>
          );
        }}
      </TokenContext.Consumer>
    );
  }
}

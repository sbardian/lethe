import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Text, Form, Input, Item, Label } from 'native-base';

const LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      token
    }
  }
`;

export const LoginForm = ({ onSetToken }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onUsernameChange = (value) => {
    setUsername(value);
  };

  const onPasswordChange = (value) => {
    setPassword(value);
  };

  const [userLogin, { loading, error }] = useMutation(LOGIN, {
    variables: {
      username,
      password,
    },
    onCompleted: (resultData) => {
      onSetToken(resultData.login.token);
    },
    onError: () => {},
  });

  return (
    <View>
      <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
        <Item floatingLabel>
          <Label style={{ color: 'white' }}>Username</Label>
          <Input
            testID="username"
            style={{ color: 'white' }}
            id="username"
            value={username}
            autoCapitalize="none"
            onChangeText={(value) => onUsernameChange(value)}
          />
        </Item>
        <Item floatingLabel>
          <Label style={{ color: 'white' }}>Password</Label>
          <Input
            testID="password"
            style={{ color: 'white' }}
            id="password"
            value={password}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(value) => onPasswordChange(value)}
          />
        </Item>
      </Form>
      <View>
        <Button
          testID="login"
          block
          light
          style={{ marginRight: 20, marginLeft: 20, marginBottom: 20 }}
          disabled={loading}
          onPress={() => {
            userLogin({
              variables: {
                username,
                password,
              },
            });
          }}
        >
          <Text>Login</Text>
        </Button>
        {error && (
          <Text
            testID="login-error"
            style={{ color: 'white', alignSelf: 'center' }}
          >
            {error.message}
          </Text>
        )}
      </View>
    </View>
  );
};

LoginForm.displayName = 'LoginForm';

LoginForm.propTypes = {
  onSetToken: PropTypes.func.isRequired,
};

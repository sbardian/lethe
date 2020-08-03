import React from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View, Easing } from 'react-native';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Text, Form, Input, Item, Label } from 'native-base';

const styles = StyleSheet.create({
  formStyle: {
    left: 300,
  },
});

const SIGN_UP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signup(
      signupInput: { username: $username, email: $email, password: $password }
    ) {
      token
    }
  }
`;

export const CreateAccountForm = ({ pageScroll, onSetToken }) => {
  const usernameBounce = new Animated.Value(1);
  const emailBounce = new Animated.Value(1);
  const passwordBounce = new Animated.Value(1);
  const passwordConfBounce = new Animated.Value(1);

  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordConf, setPasswordConf] = React.useState();
  const [invalid, setInvalid] = React.useState(true);

  const animate = () => {
    if (pageScroll) {
      usernameBounce.setValue(1);
      emailBounce.setValue(1);
      passwordBounce.setValue(1);
      passwordConfBounce.setValue(1);
    }
    Animated.stagger(100, [
      Animated.timing(usernameBounce, {
        toValue: 0,
        duration: 300,
        easing: Easing.in,
      }),
      Animated.timing(emailBounce, {
        toValue: 0,
        duration: 300,
        easing: Easing.in,
      }),
      Animated.timing(passwordBounce, {
        toValue: 0,
        duration: 300,
        easing: Easing.in,
      }),
      Animated.timing(passwordConfBounce, {
        toValue: 0,
        duration: 300,
        easing: Easing.in,
      }),
    ]).start();
  };

  React.useEffect(() => {
    animate();
  }, [pageScroll]);

  const onEmailChange = (value) => {
    setEmail(value);
  };

  const onUsernameChange = (value) => {
    setUsername(value);
  };

  const onPasswordChange = (value) => {
    setPassword(value);
  };

  const onPasswordConfChange = (value) => {
    setPasswordConf(value);
  };

  const usernameBounceForm = usernameBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 100],
  });
  const emailBounceForm = emailBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });
  const passwordBounceForm = passwordBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });
  const passwordConfBounceForm = passwordConfBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  React.useEffect(() => {
    if (
      username &&
      email &&
      password &&
      passwordConf &&
      password === passwordConf
    ) {
      setInvalid(false);
    }
  }, [username, email, password, passwordConf]);

  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    variables: {
      username,
      email,
      password,
    },
    onCompleted: (data) => {
      onSetToken(data.signup.token);
    },
  });

  if (loading) {
    return <Text>Loading . . . </Text>;
  }
  if (error) {
    return (
      <Text testId="create-account-error">{`Error: ${error.message}`}</Text>
    );
  }

  return (
    <View>
      <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
        <Animated.View
          style={[
            styles.formStyle,
            {
              transform: [
                {
                  translateX: usernameBounceForm,
                },
              ],
            },
          ]}
        >
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>Username</Label>
            <Input
              testID="register-username"
              style={{ color: 'white' }}
              id="username"
              value={username}
              autoCapitalize="none"
              onChangeText={(value) => onUsernameChange(value)}
            />
          </Item>
        </Animated.View>
        <Animated.View
          style={[
            styles.formStyle,
            {
              transform: [
                {
                  translateX: emailBounceForm,
                },
              ],
            },
          ]}
        >
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>Email</Label>
            <Input
              testID="register-email"
              style={{ color: 'white' }}
              id="email"
              value={email}
              autoCapitalize="none"
              onChangeText={(value) => onEmailChange(value)}
            />
          </Item>
        </Animated.View>
        <Animated.View
          style={[
            styles.formStyle,
            {
              transform: [
                {
                  translateX: passwordBounceForm,
                },
              ],
            },
          ]}
        >
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>Password</Label>
            <Input
              testID="register-password"
              style={{ color: 'white' }}
              id="password"
              value={password}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(value) => onPasswordChange(value)}
            />
          </Item>
        </Animated.View>
        <Animated.View
          style={[
            styles.formStyle,
            {
              transform: [
                {
                  translateX: passwordConfBounceForm,
                },
              ],
            },
          ]}
        >
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>Password Confirmation</Label>
            <Input
              testID="register-password-confirm"
              style={{ color: 'white' }}
              id="passwordConf"
              value={passwordConf}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(value) => onPasswordConfChange(value)}
            />
          </Item>
        </Animated.View>
      </Form>
      <Button
        testID="register-button"
        block
        light
        style={{ marginRight: 20, marginLeft: 20 }}
        disabled={invalid}
        onPress={() => {
          signUp();
        }}
      >
        <Text>Create Account</Text>
      </Button>
    </View>
  );
};

CreateAccountForm.displayName = 'CreateAccountForm';

CreateAccountForm.propTypes = {
  onSetToken: PropTypes.func.isRequired,
  pageScroll: PropTypes.bool.isRequired,
};

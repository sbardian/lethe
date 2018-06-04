import React, { Component } from 'react';
import { Animated, StyleSheet, View, Easing } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
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

export class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.usernameBounce = new Animated.Value(1);
    this.emailBounce = new Animated.Value(1);
    this.passwordBounce = new Animated.Value(1);
    this.passwordConfBounce = new Animated.Value(1);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConf: '',
      pageScroll: true,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.pageScroll !== state.pageScroll) {
      return {
        pageScroll: props.pageScroll,
      };
    }
    return null;
  }

  componentDidUpdate() {
    this.animate();
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

  animate() {
    this.usernameBounce.setValue(1);
    this.emailBounce.setValue(1);
    this.passwordBounce.setValue(1);
    this.passwordConfBounce.setValue(1);
    Animated.stagger(100, [
      Animated.timing(this.usernameBounce, {
        toValue: 0,
        duration: 300,
        easing: Easing.in,
      }),
      Animated.timing(this.emailBounce, {
        toValue: 0,
        duration: 300,
        easing: Easing.in,
      }),
      Animated.timing(this.passwordBounce, {
        toValue: 0,
        duration: 300,
        easing: Easing.in,
      }),
      Animated.timing(this.passwordConfBounce, {
        toValue: 0,
        duration: 300,
        easing: Easing.in,
      }),
    ]).start();
  }

  // bounceInCreateForm() {
  //   this.createAccountFormBounce.setValue(1);
  //   Animated.timing(this.createAccountFormBounce, {
  //     toValue: 0,
  //     duration: 1500,
  //     easing: Easing.bounce,
  //   }).start();
  // }

  render() {
    // const bounceForm = this.createAccountFormBounce.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [-300, 300],
    // });
    const usernameBounceForm = this.usernameBounce.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 100],
    });
    const emailBounceForm = this.emailBounce.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 300],
    });
    const passwordBounceForm = this.passwordBounce.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 300],
    });
    const passwordConfBounceForm = this.passwordConfBounce.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 300],
    });

    let valid = true;
    const { username, email, password, passwordConf } = this.state;
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
                style={{ color: 'white' }}
                id="username"
                autoCapitalize="none"
                onChangeText={value => this.onUsernameChange(value)}
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
                style={{ color: 'white' }}
                id="email"
                autoCapitalize="none"
                onChangeText={value => this.onEmailChange(value)}
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
                style={{ color: 'white' }}
                id="password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={value => this.onPasswordChange(value)}
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
                style={{ color: 'white' }}
                id="passwordConf"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={value => this.onPasswordConfChange(value)}
              />
            </Item>
          </Animated.View>
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

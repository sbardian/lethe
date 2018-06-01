import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { Button, Text, Form, Input, Item, Label } from 'native-base';
import { TokenContext } from '../context';
import { Screen } from './';
import { Logo, LoginForm, CreateAccountForm } from '../components';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  footer_menu: {
    bottom: -350,
    flex: 1,
    height: 500,
    backgroundColor: '#7b6ed6',
  },
  tip_menu: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#fff',
  },
  button_label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.slideMenu = new Animated.Value(0);
    this.imageBounce = new Animated.Value(0.3);
    this.shrink = new Animated.Value(0);
    this.imageMarginTop = new Animated.Value(0);
    this.state = {
      menu_expanded: false,
      token: 'notLoggedIn',
      slidePage: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
    this.animateImage();
  }

  openMenu(item) {
    this.setState(
      {
        menu_expanded: true,
        slidePage: item,
      },
      () => {
        this.slideMenu.setValue(0);
        Animated.spring(this.slideMenu, {
          toValue: 1,
          friction: 7,
        }).start();
        this.shrinkLogo();
      },
    );
  }

  hideMenu() {
    this.setState(
      {
        menu_expanded: false,
      },
      () => {
        this.slideMenu.setValue(1);
        Animated.spring(this.slideMenu, {
          toValue: 0,
          friction: 4,
        }).start();
        this.expandLogo();
      },
    );
  }

  animateImage() {
    this.imageBounce.setValue(0);
    Animated.spring(this.imageBounce, {
      toValue: 1,
      friction: 4,
    }).start();
  }

  expandLogo() {
    this.shrink.setValue(1);
    Animated.timing(this.shrink, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
    }).start();
    Animated.timing(this.imageMarginTop, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
    }).start();
  }

  shrinkLogo() {
    this.shrink.setValue(0);
    Animated.timing(this.shrink, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();
    Animated.timing(this.imageMarginTop, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const verticalAxis = this.slideMenu.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -300],
    });
    const size = this.shrink.interpolate({
      inputRange: [0, 1],
      outputRange: [200, 150],
    });
    const imageMargin = this.imageMarginTop.interpolate({
      inputRange: [0, 1],
      outputRange: [88, 60],
    });

    return (
      <TokenContext.Consumer>
        {({ token, setToken }) => {
          if (token) {
            console.log('token update in login');
            this.props.navigation.navigate('Home');
            return null;
          }
          return (
            <Screen style={[styles.screen]}>
              <View style={[styles.container]}>
                <View style={{ alignSelf: 'center' }}>
                  <TouchableOpacity onPress={() => this.hideMenu()}>
                    <Animated.Image
                      style={{
                        padding: 50,
                        marginTop: imageMargin,
                        width: size,
                        height: size,
                        transform: [{ scale: this.imageBounce }],
                      }}
                      source={require('../images/brian.png')}
                    />
                  </TouchableOpacity>
                </View>
                {!this.state.menu_expanded && (
                  <View>
                    <View
                      style={{
                        justifyContent: 'center',
                        marginTop: 150,
                        marginBottom: 20,
                      }}
                    >
                      <Button full light onPress={() => this.openMenu(1)}>
                        <Text>Create Account</Text>
                      </Button>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#666',
                          alignSelf: 'center',
                          marginBottom: 20,
                        }}
                      >
                        ------------- or -------------
                      </Text>
                    </View>
                    <View>
                      <Button
                        full
                        style={{ backgroundColor: '#5e525c' }}
                        onPress={() => this.openMenu(0)}
                      >
                        <Text>Login</Text>
                      </Button>
                    </View>
                  </View>
                )}
                <Animated.View
                  style={[
                    styles.footer_menu,
                    {
                      transform: [
                        {
                          translateY: verticalAxis,
                        },
                      ],
                    },
                  ]}
                >
                  {this.state.menu_expanded && (
                    <View style={{ flex: 1 }}>
                      <IndicatorViewPager
                        initialPage={this.state.slidePage}
                        style={{ height: 400 }}
                        indicator={
                          <PagerDotIndicator
                            pageCount={2}
                            style={{ height: 40, top: -40 }}
                            dotStyle={{ backgroundColor: '#666' }}
                            selectedDotStyle={{ backgroundColor: '#7b6ed6' }}
                          />
                        }
                      >
                        <View>
                          <LoginForm onSetToken={setToken} />
                        </View>
                        <View>
                          <CreateAccountForm onSetToken={setToken} />
                        </View>
                      </IndicatorViewPager>
                    </View>
                  )}
                </Animated.View>
              </View>
            </Screen>
          );
        }}
      </TokenContext.Consumer>
    );
  }
}

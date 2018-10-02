import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { Container, Content, Button, Text } from 'native-base';
import { TokenContext } from '../context';
import { LoginForm, CreateAccountForm } from '../components';

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
    height: 600,
    backgroundColor: '#7b6ed6',
  },
  tip_menu: {
    flexDirection: 'row',
  },
});

export class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.slideMenu = new Animated.Value(0);
    this.imageBounce = new Animated.Value(0.3);
    this.shrink = new Animated.Value(0);
    this.imageMarginTop = new Animated.Value(0);
    this.state = {
      menuExpanded: false,
      slidePage: 0,
      pageScroll: true,
    };
  }

  componentDidMount() {
    this.animateImage();
  }

  openMenu(item) {
    this.setState(
      {
        menuExpanded: true,
        slidePage: item,
        pageScroll: false,
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
        menuExpanded: false,
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
      friction: 3,
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

  pageScroll() {
    this.setState({
      pageScroll: false,
    });
  }

  render() {
    const verticalAxis = this.slideMenu.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -350],
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
          const { navigation } = this.props;
          if (token) {
            navigation.navigate('Home');
            return null;
          }
          const { menuExpanded, slidePage, pageScroll } = this.state;
          return (
            <Container>
              <Content contentContainerStyle={{ flex: 1 }}>
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
                        /* eslint-disable-next-line global-require */
                        source={require('../images/brian.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  {!menuExpanded && (
                    <View>
                      <View
                        style={{
                          justifyContent: 'center',
                          paddingRight: 20,
                          paddingLeft: 20,
                          marginTop: 150,
                          marginBottom: 32,
                        }}
                      >
                        <Button
                          block
                          style={{ backgroundColor: '#7b6ed6' }}
                          onPress={() => this.openMenu(1)}
                        >
                          <Text>Create Account</Text>
                        </Button>
                      </View>
                      <View />
                      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <Button
                          block
                          style={{ backgroundColor: '#7b6ed6' }}
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
                    {menuExpanded && (
                      <View style={{ flex: 1 }}>
                        <IndicatorViewPager
                          initialPage={slidePage}
                          style={{ height: 400 }}
                          onPageScroll={() => this.pageScroll()}
                          indicator={
                            // eslint-disable-next-line react/jsx-wrap-multilines
                            <PagerDotIndicator
                              pageCount={2}
                              style={{ height: 40, top: -40 }}
                              dotStyle={{ backgroundColor: '#666' }}
                              selectedDotStyle={{ backgroundColor: '#7b6ed6' }}
                            />
                          }
                        >
                          <View>
                            <LoginForm
                              pageScroll={pageScroll}
                              onSetToken={setToken}
                            />
                          </View>
                          <View>
                            <CreateAccountForm
                              pageScroll={pageScroll}
                              onSetToken={setToken}
                            />
                          </View>
                        </IndicatorViewPager>
                      </View>
                    )}
                  </Animated.View>
                </View>
              </Content>
            </Container>
          );
        }}
      </TokenContext.Consumer>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

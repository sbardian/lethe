import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
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
    bottom: -450,
    flex: 1,
    backgroundColor: '#7b6ed6',
  },
  tip_menu: {
    flexDirection: 'row',
  },
});

export const LoginScreen = ({ navigation }) => {
  const imageBounce = new Animated.Value(0.3);

  const [menuExpanded, setMenuExpanded] = React.useState(false);
  const [slidePage, setSlidePage] = React.useState(0);
  const [pageScroll, setPageScroll] = React.useState(true);

  const animateImage = () => {
    imageBounce.setValue(0);
    Animated.spring(imageBounce, {
      toValue: 1,
      friction: 3,
    }).start();
  };

  React.useEffect(() => {
    animateImage();
  }, []);

  const openMenu = item => {
    setMenuExpanded(true);
    setSlidePage(item);
    setPageScroll(true);
  };

  const hideMenu = () => {
    setMenuExpanded(false);
  };

  const { token, setToken } = React.useContext(TokenContext);

  React.useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token]);

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <View style={[styles.container]}>
          <View style={{ alignSelf: 'center' }}>
            <TouchableOpacity onPress={() => hideMenu()}>
              <Animated.Image
                style={{
                  padding: 50,
                  height: 300,
                  width: 300,
                  transform: [{ scale: imageBounce }],
                }}
                /* eslint-disable-next-line global-require */
                source={require('../images/icon.png')}
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
                  marginTop: 100,
                  marginBottom: 32,
                }}
              >
                <Button
                  block
                  style={{ backgroundColor: '#7b6ed6' }}
                  onPress={() => openMenu(1)}
                >
                  <Text>Create Account</Text>
                </Button>
              </View>
              <View />
              <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Button
                  block
                  style={{ backgroundColor: '#7b6ed6' }}
                  onPress={() => openMenu(0)}
                >
                  <Text>Login</Text>
                </Button>
              </View>
            </View>
          )}
          {menuExpanded && (
            <View style={{ flex: 1, backgroundColor: '#7b6ed6' }}>
              <IndicatorViewPager
                initialPage={slidePage}
                style={{ height: 800 }}
                onPageScroll={() => setPageScroll(false)}
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
                  <LoginForm pageScroll={pageScroll} onSetToken={setToken} />
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
        </View>
      </Content>
    </Container>
  );
};

LoginScreen.navigationOptions = {
  header: null,
};

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

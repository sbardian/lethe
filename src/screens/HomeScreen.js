/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import { Button, Container, Content, Icon, Text } from 'native-base';
import { TokenContext } from '../context';

export const HomeScreen = ({ navigation }) => (
  <Container>
    <Content contentContainerStyle={{ flex: 1 }}>
      <Grid>
        <Row
          onPress={() => navigation.navigate('Profile')}
          style={{ backgroundColor: '#5CACC4' }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon
              type="FontAwesome"
              name="user-circle-o"
              style={{ color: 'white', fontSize: 64 }}
            />
            <Text style={{ color: 'white', fontSize: 24 }}>Profile</Text>
          </View>
        </Row>

        <Row
          onPress={() => navigation.navigate('Lists')}
          style={{ backgroundColor: '#8CD19D' }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon
              type="Feather"
              name="list"
              style={{ color: 'white', fontSize: 64 }}
            />
            <Text style={{ color: 'white', fontSize: 24 }}>Lists</Text>
          </View>
        </Row>

        <Row
          onPress={() => navigation.navigate('Invitations')}
          style={{ backgroundColor: '#FCB653' }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon
              type="MaterialIcons"
              name="insert-invitation"
              style={{ color: 'white', fontSize: 64 }}
            />
            <Text style={{ color: 'white', fontSize: 24 }}>Invitations</Text>
          </View>
        </Row>
      </Grid>
    </Content>
  </Container>
);

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Home',
  headerStyle: {
    backgroundColor: '#5e525c',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: (
    <TokenContext.Consumer>
      {({ removeToken }) => (
        <Button
          transparent
          onPress={() => {
            removeToken();
            navigation.navigate('Login');
            return null;
          }}
          title="Info"
          color="#fff"
        >
          <Icon
            style={{ color: 'white' }}
            name="logout"
            type="SimpleLineIcons"
          />
        </Button>
      )}
    </TokenContext.Consumer>
  ),
});

HomeScreen.displayName = 'HomeScreen';

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

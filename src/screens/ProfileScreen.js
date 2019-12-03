/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Grid } from 'react-native-easy-grid';
import { Profile } from '../components';
import { Screen } from './Screen';

export const ProfileScreen = ({ navigation }) => (
  <Screen>
    <Grid>
      <Row>
        <Profile navigation={navigation} />
      </Row>
    </Grid>
  </Screen>
);

ProfileScreen.navigationOptions = {
  title: 'Profile',
  headerStyle: {
    backgroundColor: '#5CACC4',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

ProfileScreen.displayName = 'ProfileScreen';

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

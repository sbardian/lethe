/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Grid } from 'react-native-easy-grid';
import { Profile } from '../components';
import { Screen } from './Screen';

export class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#5CACC4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { navigation } = this.props;
    return (
      <Screen>
        <Grid>
          <Row>
            <Profile navigation={navigation} />
          </Row>
        </Grid>
      </Screen>
    );
  }
}

ProfileScreen.displayName = 'ProfileScreen';

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

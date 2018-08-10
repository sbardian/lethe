/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Grid } from 'react-native-easy-grid';
import { AddListFab, Lists } from '../components';
import { Screen } from './Screen';

export class ListsScreen extends Component {
  static navigationOptions = {
    title: 'Lists',
    headerStyle: {
      backgroundColor: '#8CD19D',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { navigation } = this.props;

    return (
      <Screen fab={<AddListFab navigation={navigation} />}>
        <Grid>
          <Row>
            <Lists navigation={navigation} />
          </Row>
        </Grid>
      </Screen>
    );
  }
}

ListsScreen.displayName = 'ListsScreen';

ListsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

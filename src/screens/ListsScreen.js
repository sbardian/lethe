/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Grid } from 'react-native-easy-grid';
import { AddListFab, Lists } from '../components';
import { Screen } from './Screen';

export const ListsScreen = ({ navigation }) => (
  <Screen fab={<AddListFab navigation={navigation} />}>
    <Grid>
      <Row>
        <Lists navigation={navigation} />
      </Row>
    </Grid>
  </Screen>
);

ListsScreen.navigationOptions = {
  title: 'Lists',
  headerStyle: {
    backgroundColor: '#8CD19D',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

ListsScreen.displayName = 'ListsScreen';

ListsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

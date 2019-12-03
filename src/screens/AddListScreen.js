/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { AddListForm } from '../components';
import { Screen } from './Screen';

export const AddListScreen = ({ navigation }) => (
  <Screen>
    <AddListForm navigation={navigation} />
  </Screen>
);

AddListScreen.navigationOptions = {
  title: 'Add List',
  headerStyle: {
    backgroundColor: '#8CD19D',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

AddListScreen.displayName = 'AddListScreen';

AddListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

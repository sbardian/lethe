/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { AddListItemForm } from '../components';
import { Screen } from './Screen';

export const AddListItemScreen = ({ navigation }) => {
  const listId = navigation.getParam('listId');

  return (
    <Screen>
      <AddListItemForm listId={listId} navigation={navigation} />
    </Screen>
  );
};

AddListItemScreen.navigationOptions = {
  title: 'Add List Item',
  headerStyle: {
    backgroundColor: '#FF5254',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

AddListItemScreen.displayName = 'AddListItemForm';

AddListItemScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

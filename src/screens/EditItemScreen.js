/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { EditItemForm } from '../components';
import { Screen } from './Screen';

export const EditItemScreen = ({ navigation }) => {
  const listId = navigation.getParam('listId');
  const item = navigation.getParam('item');
  return (
    <Screen>
      <EditItemForm listId={listId} item={item} navigation={navigation} />
    </Screen>
  );
};

EditItemScreen.displayName = 'EditItemScreen';

EditItemScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { FabBase } from './FabBase';

export const AddItemFab = ({ navigation, listId }) => (
  <FabBase
    backgroundColor="#FF5254"
    position="bottomRight"
    onPress={() => navigation.navigate('AddListItem', { listId })}
    iconName="add"
    iconType="Ionicons"
  />
);

AddItemFab.displayName = 'AddItemFab';

AddItemFab.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  listId: PropTypes.string.isRequired,
};

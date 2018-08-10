import React from 'react';
import PropTypes from 'prop-types';
import { FabBase } from './FabBase';

export const AddListFab = ({ navigation }) => (
  <FabBase
    backgroundColor="#8CD19D"
    position="bottomRight"
    onPress={() => navigation.navigate('AddList')}
    iconName="add"
    iconType="Ionicons"
  />
);

AddListFab.displayName = 'AddListFab';

AddListFab.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

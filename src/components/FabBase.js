import React from 'react';
import PropTypes from 'prop-types';
import { Fab, Icon } from 'native-base';

export const FabBase = ({
  backgroundColor,
  position,
  onPress,
  iconName,
  iconType,
}) => (
  <Fab
    style={{ backgroundColor: `${backgroundColor}` }}
    position={position}
    onPress={onPress}
  >
    <Icon type={iconType} name={iconName} />
  </Fab>
);

FabBase.displayName = 'FabBase';

FabBase.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
};

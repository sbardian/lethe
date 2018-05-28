import React, { Component } from 'react';
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

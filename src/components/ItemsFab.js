import React, { Component } from 'react';
import { Icon } from 'native-base';
import { FabBase } from './';

export const ItemsFab = ({ navigation }) => (
  <FabBase
    backgroundColor="#BAD500"
    position="bottomRight"
    onPress={() => console.log('Items action fab...')}
    iconName="dots-three-horizontal"
    iconType="Entypo"
  />
);

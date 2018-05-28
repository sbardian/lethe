import React, { Component } from 'react';
import { Icon } from 'native-base';
import { FabBase } from './';

export const AddListFab = () => (
  <FabBase
    backgroundColor="#BAD500"
    position="bottomRight"
    onPress={() => console.log('add list')}
    iconName="add"
    iconType="Ionicons"
  />
);

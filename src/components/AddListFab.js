import React, { Component } from 'react';
import { FabBase } from './';

export const AddListFab = ({ navigation }) => (
  <FabBase
    backgroundColor="#13cd4a"
    position="bottomRight"
    onPress={() => navigation.navigate('AddList')}
    iconName="add"
    iconType="Ionicons"
  />
);

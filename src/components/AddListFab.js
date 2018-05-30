import React, { Component } from 'react';
import { FabBase } from './';

export const AddListFab = ({ navigation }) => (
  <FabBase
    backgroundColor="#BAD500"
    position="bottomRight"
    onPress={() => navigation.navigate('AddList')}
    iconName="add"
    iconType="Ionicons"
  />
);

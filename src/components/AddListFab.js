import React, { Component } from 'react';
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

import React, { Component } from 'react';
import { FabBase } from './';

export const AddItemFab = ({ navigation, listId }) => (
  <FabBase
    backgroundColor="#13cd4a"
    position="bottomRight"
    onPress={() => navigation.navigate('AddListItem', { listId })}
    iconName="add"
    iconType="Ionicons"
  />
);

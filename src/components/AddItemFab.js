import React, { Component } from 'react';
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

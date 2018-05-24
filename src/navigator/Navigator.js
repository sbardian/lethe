import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { HomeScreen } from '../screens';
import { SideBar } from '../components';

export const Navigator = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

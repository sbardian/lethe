import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { HomeScreen, ListsScreen, InvitationsScreen } from '../screens';
import { SideBar } from '../components';

export const Navigator = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Lists: { screen: ListsScreen },
    Invitations: { screen: InvitationsScreen },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

import { createStackNavigator } from 'react-navigation';
import {
  HomeScreen,
  ListsScreen,
  InvitationsScreen,
  SignupScreen,
  AddListScreen,
  ItemsScreen,
} from '../screens';

const appRoutes = {
  Home: { screen: HomeScreen },
  Lists: { screen: ListsScreen },
  AddList: { screen: AddListScreen },
  Invitations: { screen: InvitationsScreen },
  Signup: { screen: SignupScreen },
  Items: { screen: ItemsScreen },
};

export const AppNavigator = createStackNavigator(appRoutes);

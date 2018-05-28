import { createStackNavigator } from 'react-navigation';
import {
  LoginScreen,
  HomeScreen,
  ListsScreen,
  InvitationsScreen,
  SignupScreen,
  AddListScreen,
} from '../screens';

export const Navigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Lists: { screen: ListsScreen },
  AddList: { screen: AddListScreen },
  Invitations: { screen: InvitationsScreen },
  Signup: { screen: SignupScreen },
});

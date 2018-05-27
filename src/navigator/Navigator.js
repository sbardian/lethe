import { createStackNavigator } from 'react-navigation';
import {
  LoginScreen,
  HomeScreen,
  ListsScreen,
  InvitationsScreen,
  SignupScreen,
} from '../screens';

export const Navigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Lists: { screen: ListsScreen },
  Invitations: { screen: InvitationsScreen },
  Signup: { screen: SignupScreen },
});

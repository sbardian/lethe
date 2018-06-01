import { createStackNavigator } from 'react-navigation';
import {
  LoginScreen,
  HomeScreen,
  ListsScreen,
  InvitationsScreen,
  SignupScreen,
  AddListScreen,
  ItemsScreen,
} from '../screens';

const stackConfig = {
  headerMode: 'none',
};

const LoginRoutes = {
  Login: {
    screen: LoginScreen,
  },
};

const MainRoutes = {
  Home: { screen: HomeScreen },
  Lists: { screen: ListsScreen },
  AddList: { screen: AddListScreen },
  Invitations: { screen: InvitationsScreen },
  Signup: { screen: SignupScreen },
  Items: { screen: ItemsScreen },
};

const LoginNav = createStackNavigator(LoginRoutes, stackConfig);
const MainNav = createStackNavigator(MainRoutes);

export const Navigator = createStackNavigator(
  {
    Login: {
      screen: LoginNav,
      navigationOptions: {
        header: null,
      },
    },
    Main: {
      screen: MainNav,
    },
  },
  {
    headerMode: 'none',
  },
);

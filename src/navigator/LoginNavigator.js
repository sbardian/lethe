import { createStackNavigator } from 'react-navigation';
import { LoginScreen } from '../screens';
import { stackConfig } from './';

const loginRoutes = {
  Login: {
    screen: LoginScreen,
  },
};

export const LoginNavigator = createStackNavigator(loginRoutes, stackConfig);

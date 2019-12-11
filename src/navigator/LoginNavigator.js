import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from '../screens';
import { stackConfig } from './config';

const loginRoutes = {
  Login: {
    screen: LoginScreen,
  },
};

export const LoginNavigator = createStackNavigator(loginRoutes, stackConfig);

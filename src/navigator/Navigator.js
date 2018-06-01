import { createStackNavigator } from 'react-navigation';
import { LoginNavigator } from './LoginNavigator';
import { AppNavigator } from './AppNavigator';
import { stackConfig } from './config';

export const Navigator = createStackNavigator(
  {
    Login: {
      screen: LoginNavigator,
    },
    Main: {
      screen: AppNavigator,
    },
  },
  stackConfig,
);

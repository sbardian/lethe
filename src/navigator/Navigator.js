import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginNavigator } from './LoginNavigator';
import { AppNavigator } from './AppNavigator';
import { stackConfig } from './config';

const Navigator = createStackNavigator(
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

export const AppContainer = createAppContainer(Navigator);

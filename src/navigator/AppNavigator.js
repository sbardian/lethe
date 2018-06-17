import { createStackNavigator } from 'react-navigation';
import {
  HomeScreen,
  ListsScreen,
  InvitationsScreen,
  SignupScreen,
  AddListScreen,
  ItemsScreen,
  AddListItemScreen,
  SendInvitationScreen,
  ListSettingsScreen,
} from '../screens';

const appRoutes = {
  Home: { screen: HomeScreen },
  Lists: { screen: ListsScreen },
  AddList: { screen: AddListScreen },
  Invitations: { screen: InvitationsScreen },
  Signup: { screen: SignupScreen },
  Items: {
    screen: ItemsScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
    }),
  },
  AddListItem: { screen: AddListItemScreen },
  SendInvitation: {
    screen: SendInvitationScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Invite to ${navigation.state.params.title}`,
    }),
  },
  ListSettings: {
    screen: ListSettingsScreen,
  },
};

export const AppNavigator = createStackNavigator(appRoutes);

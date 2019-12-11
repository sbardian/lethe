import { createStackNavigator } from 'react-navigation-stack';
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
  ProfileScreen,
  EditItemScreen,
} from '../screens';

const appRoutes = {
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
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
  EditItem: {
    screen: EditItemScreen,
  },
};

export const AppNavigator = createStackNavigator(appRoutes);

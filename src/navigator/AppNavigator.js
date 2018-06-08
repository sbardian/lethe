import { createStackNavigator } from 'react-navigation';
import {
  HomeScreen,
  ListsScreen,
  InvitationsScreen,
  SignupScreen,
  AddListScreen,
  ItemsScreen,
  EditListScreen,
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
      title: `${navigation.state.params.list.title}`,
    }),
  },
  EditList: { screen: EditListScreen },
  AddListItem: { screen: AddListItemScreen },
  SendInvitation: {
    screen: SendInvitationScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Invite to ${navigation.state.params.list.title}`,
    }),
  },
  ListSettings: {
    screen: ListSettingsScreen,
  },
};

export const AppNavigator = createStackNavigator(appRoutes);

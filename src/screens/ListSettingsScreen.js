import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { ListSettings } from '../components/ListSettings/ListSettings';
import { Screen } from './Screen';

export const ListSettingsScreen = ({ navigation }) => {
  const listId = navigation.getParam('listId');
  const title = navigation.getParam('title');
  return (
    <Screen>
      <ListSettings title={title} listId={listId} navigation={navigation} />
    </Screen>
  );
};

ListSettingsScreen.navigationOptions = {
  title: 'Settings',
  headerStyle: {
    backgroundColor: '#8CD19D',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

ListSettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

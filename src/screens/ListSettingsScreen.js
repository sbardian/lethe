import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { ListSettings } from '../components/ListSettings/ListSettings';
import { Screen } from './Screen';

export class ListSettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: '#8CD19D',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { navigation } = this.props;
    const listId = navigation.getParam('listId');
    const title = navigation.getParam('title');
    return (
      <Screen>
        <ListSettings title={title} listId={listId} navigation={navigation} />
      </Screen>
    );
  }
}

ListSettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

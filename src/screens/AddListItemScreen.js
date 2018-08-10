/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AddListItemForm } from '../components';
import { Screen } from './Screen';

export class AddListItemScreen extends Component {
  static navigationOptions = {
    title: 'Add List Item',
    headerStyle: {
      backgroundColor: '#FF5254',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { navigation } = this.props;
    const listId = navigation.getParam('listId');
    return (
      <Screen>
        <AddListItemForm listId={listId} navigation={navigation} />
      </Screen>
    );
  }
}

AddListItemForm.displayName = 'AddListItemForm';

AddListItemForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

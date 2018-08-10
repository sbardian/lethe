/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditItemForm } from '../components';
import { Screen } from './Screen';

export class EditItemScreen extends Component {
  static navigationOptions = {
    title: 'Edit Item',
    headerStyle: {
      backgroundColor: '#5CACC4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { navigation } = this.props;
    const listId = navigation.getParam('listId');
    const item = navigation.getParam('item');

    return (
      <Screen>
        <EditItemForm listId={listId} item={item} navigation={navigation} />
      </Screen>
    );
  }
}

EditItemScreen.displayName = 'EditItemScreen';

EditItemScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

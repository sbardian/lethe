/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { SendInvitationForm } from '../components';
import { Screen } from './Screen';

export const SendInvitationScreen = ({ navigation }) => {
  const listId = navigation.getParam('listId');
  return (
    <Screen>
      <SendInvitationForm listId={listId} navigation={navigation} />
    </Screen>
  );
};

SendInvitationScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#FF5254',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

SendInvitationScreen.displayName = 'SendInvitaionForm';

SendInvitationScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

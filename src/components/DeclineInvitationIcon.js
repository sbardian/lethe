import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Icon, Toast } from 'native-base';

const DECLINE_INVITATION = gql`
  mutation declineInvitation($invitationId: String!) {
    deleteInvitation(invitationId: $invitationId) {
      id
      inviter
      invitee
      list
      title
    }
  }
`;

export const DeclineInvitationIcon = ({ invitation }) => (
  <Mutation
    mutation={DECLINE_INVITATION}
    onCompleted={() =>
      Toast.show({
        text: 'Invitation declined.',
        buttonText: 'Okay',
        type: 'warning',
        position: 'bottom',
      })
    }
  >
    {(declineInvitation, { loading }) => (
      <Icon
        disabled={loading}
        onPress={async () => {
          console.log('decline invitation');
          await declineInvitation({
            variables: { invitationId: invitation.id },
          });
        }}
        type="MaterialIcons"
        name="delete"
      />
    )}
  </Mutation>
);

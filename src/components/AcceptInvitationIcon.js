import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Icon, Toast } from 'native-base';

const ACCEPT_INVITATION = gql`
  mutation acceptInvitation($invitationId: String!) {
    acceptInvitation(invitationId: $invitationId) {
      id
      inviter
      invitee
      list
      title
    }
  }
`;

export const AcceptInvitationIcon = ({ invitation }) => (
  <Mutation
    mutation={ACCEPT_INVITATION}
    onCompleted={() =>
      Toast.show({
        text: 'List joined!',
        buttonText: 'Okay',
        type: 'success',
        position: 'bottom',
      })
    }
  >
    {(acceptInvitation, { loading }) => (
      <Icon
        disabled={loading}
        onPress={async () => {
          console.log('join list');
          await acceptInvitation({
            variables: { invitationId: invitation.id },
          });
        }}
        type="Ionicons"
        name="md-add-circle"
      />
    )}
  </Mutation>
);

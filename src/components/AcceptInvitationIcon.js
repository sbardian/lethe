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

const GET_MY_INVITATIONS = gql`
  {
    getMyInfo {
      id
      invitations {
        id
        inviter
        invitee
        title
      }
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
        duration: 3000,
      })
    }
    onError={error =>
      Toast.show({
        text: `An error has occured: ${error.message}`,
        buttonText: 'Okay',
        type: 'danger',
        position: 'bottom',
        duration: 3000,
      })
    }
  >
    {(acceptInvitation, { loading }) => (
      <Icon
        disabled={loading}
        onPress={async () => {
          console.log('join list');
          await acceptInvitation({
            refetchQueries: [
              {
                query: GET_MY_INVITATIONS,
              },
            ],
            variables: { invitationId: invitation.id },
          });
        }}
        type="Ionicons"
        name="md-add-circle"
      />
    )}
  </Mutation>
);

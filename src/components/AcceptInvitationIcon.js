import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Icon, Text, Toast } from 'native-base';

const ACCEPT_INVITATION = gql`
  mutation acceptInvitation($invitationId: String!) {
    acceptInvitation(invitationId: $invitationId) {
      id
      inviter {
        id
      }
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
      lists {
        id
        title
        owner
      }
      invitations {
        id
        inviter {
          id
        }
        invitee
        title
      }
    }
  }
`;

export const AcceptInvitationIcon = ({ invitationId }) => (
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
      <Button
        iconLeft
        light
        info
        disabled={loading}
        onPress={async () => {
          await acceptInvitation({
            refetchQueries: [
              {
                query: GET_MY_INVITATIONS,
              },
            ],
            variables: { invitationId },
          });
        }}
      >
        <Icon type="Ionicons" name="md-add-circle" />
        <Text>Accept</Text>
      </Button>
    )}
  </Mutation>
);

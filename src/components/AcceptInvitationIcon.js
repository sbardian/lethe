import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Text, Toast } from 'native-base';

const ACCEPT_INVITATION = gql`
  mutation acceptInvitation($invitationId: String!) {
    acceptInvitation(invitationId: $invitationId) {
      id
      inviter {
        id
      }
      invitee {
        id
        username
        profileImageUrl
        email
      }
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
        invitee {
          id
          username
          profileImageUrl
          email
        }
        title
      }
    }
  }
`;

export const AcceptInvitationIcon = ({ invitationId }) => {
  const [acceptInvitation, { loading }] = useMutation(ACCEPT_INVITATION, {
    onCompleted: () => {
      Toast.show({
        text: 'List joined!',
        buttonText: 'Okay',
        type: 'success',
        position: 'bottom',
        duration: 3000,
      });
    },
    onError: error => {
      Toast.show({
        text: `An error has occured: ${error.message}`,
        buttonText: 'Okay',
        type: 'danger',
        position: 'bottom',
        duration: 3000,
      });
    },
    refetchQueries: [
      {
        query: GET_MY_INVITATIONS,
      },
    ],
    variables: { invitationId },
  });

  return (
    <Button
      iconLeft
      light
      info
      disabled={loading}
      onPress={() => acceptInvitation()}
    >
      <Icon type="Ionicons" name="md-add-circle" />
      <Text>Accept</Text>
    </Button>
  );
};

AcceptInvitationIcon.displayName = 'AcceptInvitationIcon';

AcceptInvitationIcon.propTypes = {
  invitationId: PropTypes.string.isRequired,
};

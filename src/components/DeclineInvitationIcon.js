import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Icon, Text, Toast } from 'native-base';

const DECLINE_INVITATION = gql`
  mutation declineInvitation($invitationId: String!) {
    deleteInvitation(invitationId: $invitationId) {
      id
      inviter {
        id
      }
      invitee {
        id
      }
      list
      title
    }
  }
`;

const GET_MY_INFO = gql`
  {
    getMyInfo {
      id
      username
      email
      profileImageUrl
      lists {
        title
        invitations {
          id
          title
          invitee {
            id
            username
            profileImageUrl
            email
          }
          inviter {
            id
            username
            profileImageUrl
            email
          }
        }
      }
    }
  }
`;

const GET_MY_INVITATIONS = gql`
  {
    getMyInfo {
      id
      invitations {
        id
        inviter {
          id
        }
        invitee {
          id
        }
        title
      }
    }
  }
`;

export const DeclineInvitationIcon = ({
  invitationId,
  buttonText = '',
  buttonProps,
  iconColor,
}) => (
  <Mutation
    mutation={DECLINE_INVITATION}
    onCompleted={() =>
      Toast.show({
        text: 'Invitation declined.',
        buttonText: 'Okay',
        type: 'warning',
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
    {(declineInvitation, { loading }) => (
      <Button
        {...buttonProps}
        disabled={loading}
        onPress={async () => {
          await declineInvitation({
            refetchQueries: [
              {
                query: GET_MY_INVITATIONS,
              },
              {
                query: GET_MY_INFO,
              },
            ],
            variables: { invitationId },
          });
        }}
      >
        <Icon
          style={{ color: iconColor }}
          type="MaterialCommunityIcons"
          name="delete-forever"
        />
        {buttonText && <Text>{buttonText}</Text>}
      </Button>
    )}
  </Mutation>
);

DeclineInvitationIcon.displayName = 'DeclineInvitationIcon';

DeclineInvitationIcon.propTypes = {
  invitationId: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
};

DeclineInvitationIcon.defaultProps = {
  buttonText: null,
};

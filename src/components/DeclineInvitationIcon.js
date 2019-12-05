import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
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
}) => {
  const [declineInvitation, { loading }] = useMutation(DECLINE_INVITATION, {
    onCompleted: () => {
      Toast.show({
        text: 'Invitation declined.',
        buttonText: 'Okay',
        type: 'warning',
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
    variables: { invitationId },
  });

  return (
    <Button
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...buttonProps}
      disabled={loading}
      onPress={() => {
        declineInvitation({
          refetchQueries: [
            {
              query: GET_MY_INVITATIONS,
            },
            {
              query: GET_MY_INFO,
            },
          ],
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
  );
};

DeclineInvitationIcon.displayName = 'DeclineInvitationIcon';

DeclineInvitationIcon.propTypes = {
  buttonProps: PropTypes.shape({
    iconLeft: PropTypes.bool,
    light: PropTypes.bool,
    info: PropTypes.bool,
  }),
  iconColor: PropTypes.string,
  invitationId: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
};

DeclineInvitationIcon.defaultProps = {
  buttonProps: {},
  buttonText: null,
  iconColor: null,
};

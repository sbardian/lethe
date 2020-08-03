/* eslint-disable global-require */
import React from 'react';
import { FlatList, View } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Text, Card, CardItem, Body, Thumbnail, H3 } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import { AcceptInvitationIcon } from './AcceptInvitationIcon';
import { DeclineInvitationIcon } from './DeclineInvitationIcon';
import defaultProfileImage from '../images/defaultProfile.jpg';

const GET_MY_INVITATIONS = gql`
  {
    getMyInfo {
      id
      invitations {
        id
        inviter {
          id
          username
          email
          profileImageUrl
        }
        invitee {
          id
          username
          email
          profileImageUrl
        }
        title
      }
    }
  }
`;

const INVITATION_ADDED = gql`
  subscription onInvitationAdded {
    invitationAdded {
      id
      title
      invitee {
        id
        username
        email
        profileImageUrl
      }
      inviter {
        id
        username
        email
        profileImageUrl
      }
    }
  }
`;

const INVITATION_DELETED = gql`
  subscription onInvitationDeleted {
    invitationDeleted {
      id
      title
      invitee {
        id
        username
        email
        profileImageUrl
      }
      inviter {
        id
        username
        email
        profileImageUrl
      }
    }
  }
`;

export const Invitations = () => {
  const { subscribeToMore, loading, error, data } = useQuery(
    GET_MY_INVITATIONS,
  );
  if (loading) {
    return <Text>Loading . . . </Text>;
  }
  if (error) {
    return <Text>Error: ${error.message}</Text>;
  }

  const {
    getMyInfo: { invitations },
  } = data;

  subscribeToMore({
    document: INVITATION_ADDED,
    updateQuery: (prev, { subscriptionData }) => {
      console.log('test');
      if (!subscriptionData.data) return prev;
      const { id } = subscriptionData.data.invitationAdded;
      if (!prev.getMyInfo.invitations.some((invite) => invite.id === id)) {
        const newInvitations = {
          ...prev,
          getMyInfo: {
            ...prev.getMyInfo,
            invitations: [
              { ...subscriptionData.data.invitationAdded },
              ...prev.getMyInfo.invitations,
            ],
          },
        };
        return newInvitations;
      }
      return prev;
    },
  });
  subscribeToMore({
    document: INVITATION_DELETED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const { id } = subscriptionData.data.invitationDeleted;
      if (prev.getMyInfo.invitations.some((invite) => invite.id === id)) {
        const filteredInvitations = prev.getMyInfo.invitations.filter(
          (invite) => invite.id !== id,
        );
        const newInvitations = {
          ...prev,
          getMyInfo: {
            ...prev.getMyInfo,
            invitations: [...filteredInvitations],
          },
        };
        return newInvitations;
      }
      return prev;
    },
  });

  return (
    <FlatList
      bordered
      data={invitations}
      renderItem={({ item }) => {
        return (
          <Card>
            <CardItem header bordered>
              <Thumbnail
                circle
                small
                style={{ marginRight: 10 }}
                source={
                  item.inviter.profileImageUrl
                    ? {
                        uri: `https://${item.inviter.profileImageUrl}/profileImage.jpg`,
                      }
                    : { uri: `${defaultProfileImage}` }
                }
              />
              <Text>{`Invitation from ${item.inviter.username}:`}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <H3>{item.title}</H3>
              </Body>
            </CardItem>
            <View style={(s.flx_i, [s.flx_row, s.jcsa, s.aic, s.pa3])}>
              <AcceptInvitationIcon invitationId={item.id} />
              <DeclineInvitationIcon
                buttonProps={{
                  iconLeft: true,
                  light: true,
                  info: true,
                }}
                buttonText="Decline"
                invitationId={item.id}
              />
            </View>
          </Card>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

Invitations.displayName = 'Invitations';

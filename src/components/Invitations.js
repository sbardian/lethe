import React from 'react';
import { FlatList, View } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Text,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Thumbnail,
  H3,
} from 'native-base';
import { AcceptInvitationIcon, DeclineInvitationIcon } from './';
import { styles as s } from 'react-native-style-tachyons';

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
        invitee
        title
      }
    }
  }
`;

const GET_INVITER = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      id
      username
      profileImageUrl
    }
  }
`;

const INVITATION_ADDED = gql`
  subscription invitationAdded {
    invitationAdded {
      id
      title
      invitee
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
  subscription invitationDeleted {
    invitationDeleted {
      id
      title
      invitee
      inviter {
        id
        username
        email
        profileImageUrl
      }
    }
  }
`;

export const Invitations = () => (
  <Query query={GET_MY_INVITATIONS}>
    {({
      subscribeToMore,
      loading,
      error,
      data: { getMyInfo: { invitations } = [] },
    }) => {
      if (loading) {
        return <Text>Loading . . . </Text>;
      }
      if (error) {
        return <Text>Error: ${error.message}</Text>;
      }
      subscribeToMore({
        document: INVITATION_ADDED,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { id } = subscriptionData.data.invitationAdded;
          if (!prev.getMyInfo.invitations.some(invite => invite.id === id)) {
            const newInvitations = Object.assign({}, prev, {
              getMyInfo: {
                ...prev.getMyInfo,
                invitations: [
                  { ...subscriptionData.data.invitationAdded },
                  ...prev.getMyInfo.invitations,
                ],
              },
            });
            return newInvitations;
          }
        },
      });
      subscribeToMore({
        document: INVITATION_DELETED,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log('subscriptionData: ', subscriptionData);
          const { id } = subscriptionData.data.invitationDeleted;
          if (prev.getMyInfo.invitations.some(invite => invite.id === id)) {
            const filteredInvitations = prev.getMyInfo.invitations.filter(
              invite => invite.id !== id,
            );
            const newInvitations = Object.assign({}, prev, {
              getMyInfo: {
                ...prev.getMyInfo,
                invitations: [...filteredInvitations],
              },
            });
            console.log('newInvitations: ', newInvitations);
            return newInvitations;
          }
        },
      });
      return (
        <FlatList
          bordered
          data={invitations}
          renderItem={({ item }) => (
            <Card>
              <CardItem header bordered>
                <Thumbnail
                  circle
                  small
                  style={{ marginRight: 10 }}
                  source={
                    item.inviter.profileImageUrl
                      ? { uri: `https://${item.inviter.profileImageUrl}` }
                      : require('../images/defaultProfile.jpg')
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
                  buttonText="Decline"
                  invitationId={item.id}
                />
              </View>
            </Card>
          )}
          keyExtractor={item => item.id}
        />
      );
    }}
  </Query>
);

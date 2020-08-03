/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { Body, Icon, Text, Card, Thumbnail, CardItem } from 'native-base';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { styles as s } from 'react-native-style-tachyons';
import { DeclineInvitationIcon } from '../DeclineInvitationIcon';

const GET_LIST_INVITATIONS = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      owner
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
`;

const LIST_SETTINGS_UPDATED = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      owner
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
`;

export const ListInvitations = ({ listId }) => {
  const { subscribeToMore, loading, error, data } = useQuery(
    GET_LIST_INVITATIONS,
    {
      variables: {
        id_is: listId,
      },
    },
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Something went wrong, please try again.</Text>;
  }

  const { getLists } = data;
  const [{ invitations }] = getLists;

  subscribeToMore({
    document: LIST_SETTINGS_UPDATED,
    variables: { id_is: listId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      return subscriptionData.data;
    },
  });

  return (
    <View>
      <View style={[s.flx_row, s.jcsb]}>
        <View style={[s.flx_row, s.jcfs, s.pa3]}>
          <Icon
            style={[s.f5, s.ltext]}
            type="MaterialIcons"
            name="insert-invitation"
          />
          <Text style={[s.asc, s.pl3, s.pr3, s.ltext]}>List Invitations</Text>
        </View>
      </View>
      <FlatList
        bordered
        data={invitations}
        renderItem={({ item }) => (
          <Card>
            <CardItem bordered>
              <Thumbnail
                circle
                small
                style={{ marginRight: 10 }}
                source={
                  item.invitee.profileImageUrl
                    ? {
                        uri: `https://${item.invitee.profileImageUrl}/profileImage.jpg`,
                      }
                    : require('../../images/defaultProfile.jpg')
                }
              />
              <Text style={[s.mr3]}>
                {`Invitation from: ${item.inviter.username} to ${item.invitee.username}`}
              </Text>
              <DeclineInvitationIcon
                iconColor="#a01c1c"
                buttonProps={{
                  danger: true,
                  style: {
                    backgroundColor: 'transparent',
                  },
                }}
                invitationId={item.id}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>{`Message: ${item.title}`}</Text>
              </Body>
            </CardItem>
          </Card>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

ListInvitations.propTypes = {
  listId: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

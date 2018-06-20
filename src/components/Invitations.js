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
        inviter
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

export const Invitations = () => (
  <Query query={GET_MY_INVITATIONS}>
    {({ loading, error, data: { getMyInfo: { invitations } = [] } }) => {
      if (loading) {
        return <Text>Loading . . . </Text>;
      }
      if (error) {
        return <Text>Error: ${error.message}</Text>;
      }
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
                  source={{
                    uri:
                      'https://facebook.github.io/react-native/docs/assets/favicon.png',
                  }}
                />
                <Text>{`Invitation from ${item.inviter}:`}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <H3>{item.title}</H3>
                </Body>
              </CardItem>
              <View style={(s.flx_i, [s.flx_row, s.jcsa, s.aic, s.pa3])}>
                <AcceptInvitationIcon invitation={item} />
                <DeclineInvitationIcon invitation={item} />
              </View>
            </Card>
          )}
          keyExtractor={item => item.id}
        />
      );
    }}
  </Query>
);

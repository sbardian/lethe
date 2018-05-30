import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Text, Content, Card, CardItem, Body, Left, Right } from 'native-base';
import { AcceptInvitationIcon, DeclineInvitationIcon } from './';

const GET_MY_INVITATIONS = gql`
  {
    getMyInfo {
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
        <Card
          bordered
          dataArray={invitations}
          renderRow={invitation => (
            <Content>
              <CardItem header>
                <Left>
                  <Text>Title: {invitation.title}</Text>
                </Left>
                <Right>
                  <AcceptInvitationIcon invitation={invitation} />
                  <DeclineInvitationIcon invitation={invitation} />
                </Right>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>From: {invitation.inviter}</Text>
                </Body>
              </CardItem>
            </Content>
          )}
        />
      );
    }}
  </Query>
);

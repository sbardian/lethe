import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {
  Text,
  Content,
  Card,
  CardItem,
  Body,
  Icon,
  Left,
  Right,
  Toast,
} from 'native-base';

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
    }
  }
`;

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
                  <Mutation
                    mutation={ACCEPT_INVITATION}
                    onCompleted={() =>
                      Toast.show({
                        text: 'List joined!',
                        buttonText: 'Okay',
                        type: 'success',
                        position: 'bottom',
                      })
                    }
                  >
                    {(acceptInvitation, { loading }) => (
                      <Icon
                        disabled={loading}
                        onPress={async () => {
                          console.log('join list');
                          await acceptInvitation({
                            variables: { invitationId: invitation.id },
                          });
                        }}
                        type="Ionicons"
                        name="md-add-circle"
                      />
                    )}
                  </Mutation>
                  <Icon
                    onPress={() => {
                      console.log('dont join list');
                    }}
                    type="MaterialIcons"
                    name="delete"
                  />
                </Right>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Query
                    query={GET_INVITER}
                    variables={{ userId: invitation.inviter }}
                  >
                    {({
                      loading,
                      error,
                      data: { getUser: { username } = 'User Not Found' },
                    }) => {
                      if (loading) {
                        return <Text>Loading . . . </Text>;
                      }
                      if (error) {
                        return <Text>Error: ${error.message}</Text>;
                      }
                      return <Text>From: {username}</Text>;
                    }}
                  </Query>
                </Body>
              </CardItem>
            </Content>
          )}
        />
      );
    }}
  </Query>
);

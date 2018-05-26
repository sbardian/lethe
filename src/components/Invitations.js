import React from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Text, List, ListItem, Icon, Left, Right } from 'native-base';

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
        <View>
          <List
            dataArray={invitations}
            renderRow={invitation => (
              <ListItem>
                <Left>
                  <Text>{invitation.title}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )}
          />
        </View>
      );
    }}
  </Query>
);

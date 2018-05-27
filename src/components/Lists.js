import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Text, List, ListItem, Icon, Left, Right } from 'native-base';

const GET_MY_LISTS = gql`
  {
    getMyInfo {
      id
      lists {
        id
        title
      }
    }
  }
`;

export const Lists = () => (
  <Query query={GET_MY_LISTS}>
    {({ loading, error, data: { getMyInfo: { lists } = [] } }) => {
      if (loading) {
        return <Text>Loading . . . </Text>;
      }
      if (error) {
        return <Text>Error: ${error.message}</Text>;
      }
      return (
        <List
          dataArray={lists}
          renderRow={list => (
            <ListItem>
              <Left>
                <Text>{list.title}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          )}
        />
      );
    }}
  </Query>
);

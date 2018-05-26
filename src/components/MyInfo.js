import React from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Text } from 'native-base';

const GET_MY_INFO = gql`
  {
    getMyInfo {
      id
      username
      email
    }
  }
`;

export const MyInfo = () => (
  <Query query={GET_MY_INFO}>
    {({ loading, error, data: { getMyInfo: { username } = {} } }) => {
      if (loading) {
        return <Text>Loading . . . </Text>;
      }
      if (error) {
        return <Text>Error: ${error.message}</Text>;
      }
      return (
        <View>
          <Text>Welcome {username}</Text>
        </View>
      );
    }}
  </Query>
);

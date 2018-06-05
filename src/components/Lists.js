import React from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_MY_LISTS = gql`
  {
    getMyInfo {
      lists {
        id
        title
        owner
      }
    }
  }
`;

export const Lists = ({ navigation }) => (
  <Query query={GET_MY_LISTS}>
    {({ loading, error, data: { getMyInfo: { lists } = [] } }) => {
      if (loading) {
        return <Text>Loading . . . </Text>;
      }
      if (error) {
        return <Text>Error: ${error.message}</Text>;
      }
      return (
        <FlatList
          data={lists}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[s.pa3, s.bb, s.bg__white]}
              onPress={() =>
                navigation.navigate('Items', {
                  list: item,
                })
              }
            >
              <View>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      );
    }}
  </Query>
);

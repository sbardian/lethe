import React from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LIST_ITEMS = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      items {
        id
        title
        creator
      }
    }
  }
`;

export const Items = ({ navigation, listId }) => (
  <Query query={GET_LIST_ITEMS} variables={{ id_is: listId }}>
    {({ loading, error, data: { getLists = [] } }) => {
      if (loading) {
        return <Text>Loading . . . </Text>;
      }
      if (error) {
        return <Text>Error: ${error.message}</Text>;
      }
      return (
        <FlatList
          data={getLists[0].items}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[s.pa3, s.bb, s.b__red]}
              onPress={() => console.log('Item pressed')}
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

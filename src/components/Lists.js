import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_MY_LISTS = gql`
  {
    getMyInfo {
      id
      lists {
        id
        title
        owner
      }
    }
  }
`;

const LIST_DELETED = gql`
  subscription onListDeleted {
    listDeleted {
      id
      title
      owner
    }
  }
`;

export const Lists = ({ navigation }) => (
  <Query query={GET_MY_LISTS}>
    {({
      subscribeToMore,
      loading,
      error,
      data: { getMyInfo: { lists } = [] },
    }) => {
      if (loading) {
        return <Text>Loading . . . </Text>;
      }
      if (error) {
        return <Text>Error: ${error.message}</Text>;
      }
      subscribeToMore({
        document: LIST_DELETED,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { id } = subscriptionData.data.listDeleted;
          if (prev.getMyInfo.lists.some(list => list.id === id)) {
            const filteredLists = prev.getMyInfo.lists.filter(
              list => list.id !== id,
            );
            const newLists = Object.assign({}, prev, {
              getMyInfo: {
                ...prev.getMyInfo,
                lists: [...filteredLists],
              },
            });
            return newLists;
          }
        },
      });
      return (
        <FlatList
          data={lists}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[s.pa3, s.bb, s.b__ltext, s.bg_white]}
              onPress={() =>
                navigation.navigate('Items', {
                  listId: item.id,
                  title: item.title,
                })
              }
            >
              <View>
                <Text style={[s.ltext]}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      );
    }}
  </Query>
);

Lists.displayName = 'Lists';

Lists.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

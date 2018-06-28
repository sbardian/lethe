import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Swipeout from 'react-native-swipeout';

const GET_LIST_ITEMS = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      title
      items {
        id
        title
        creator
        list
      }
    }
  }
`;

const ITEMS_SUBSCRIPTION = gql`
  subscription onItemAdded($listId: String!) {
    itemAdded(listId: $listId) {
      id
      title
      creator
      list
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteItem($itemId: String!) {
    deleteItem(itemId: $itemId) {
      id
      title
    }
  }
`;

export const Items = ({ navigation, listId, close = true }) => (
  <Query query={GET_LIST_ITEMS} variables={{ id_is: listId }}>
    {({ subscribeToMore, loading, error, data: { getLists = [] } }) => {
      if (loading) {
        return <Text>Loading . . . </Text>;
      }
      if (error) {
        return <Text>Error: ${error.message}</Text>;
      }
      subscribeToMore({
        document: ITEMS_SUBSCRIPTION,
        variables: { listId },
        updateQuery: (prev, { subscriptionData }) => {
          console.log('subscripton running');
          if (!subscriptionData.data) return prev;
          console.log('itemAdded: ', subscriptionData.data.itemAdded);
          const { id, list } = subscriptionData.data.itemAdded;
          console.log('prev = ', prev);
          if (
            // prev.getLists[0].id === list &&
            !prev.getLists[0].items.some(item => item.id === id)
          ) {
            console.log('match. . . adding new item');
            const newItem = Object.assign({}, prev, {
              getLists: [
                {
                  ...prev.getLists[0],
                  items: [
                    { ...subscriptionData.data.itemAdded },
                    ...prev.getLists[0].items,
                  ],
                },
              ],
            });
            console.log('newItem = ', newItem);
            return newItem;
          }
        },
      });
      const { items } = getLists[0];
      return (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Swipeout
              close={true}
              backgroundColor="#ffffff"
              style={[s.jcc, s.bb]}
              buttonWidth={50}
              right={[
                {
                  backgroundColor: '#fff',
                  component: (
                    <Mutation mutation={DELETE_ITEM}>
                      {deleteItem => (
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <TouchableOpacity
                            disabled={loading}
                            onPress={async () =>
                              deleteItem({
                                refetchQueries: [
                                  {
                                    query: GET_LIST_ITEMS,
                                    variables: {
                                      id_is: listId,
                                    },
                                  },
                                ],
                                variables: { itemId: item.id },
                              })
                            }
                          >
                            <Icon
                              style={{ color: '#bd1b29' }}
                              name="delete"
                              type="MaterialIcons"
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </Mutation>
                  ),
                },
                {
                  backgroundColor: '#fff',
                  component: (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditItem', { item, listId })
                        }
                      >
                        <Icon
                          style={{ color: '#171574' }}
                          name="edit"
                          type="MaterialIcons"
                        />
                      </TouchableOpacity>
                    </View>
                  ),
                },
              ]}
            >
              <TouchableOpacity
                style={[s.pa3]}
                onPress={() => console.log('item pressed')}
              >
                <View>
                  <Text>{item.title}</Text>
                </View>
              </TouchableOpacity>
            </Swipeout>
          )}
          keyExtractor={item => item.id}
        />
      );
    }}
  </Query>
);

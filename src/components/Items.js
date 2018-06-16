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
      }
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

export const Items = ({ navigation, listId }) => (
  <Query query={GET_LIST_ITEMS} variables={{ id_is: listId }}>
    {({ loading, error, data: { getLists = [] } }) => {
      if (loading) {
        return <Text>Loading . . . </Text>;
      }
      if (error) {
        return <Text>Error: ${error.message}</Text>;
      }
      const { items } = getLists[0];
      return (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Swipeout
              autoClose
              backgroundColor="#ffffff"
              style={[s.jcc, s.bb]}
              buttonWidth={50}
              right={[
                {
                  backgroundColor: '#fff',
                  component: (
                    <Mutation
                      mutation={DELETE_ITEM}
                      update={(cache, { data }) => {
                        const cacheData = cache.readQuery({
                          query: GET_LIST_ITEMS,
                          variables: { id_is: listId },
                        });
                        const newCacheData = cacheData.getLists[0].items.filter(
                          casheItem => casheItem.id !== data.deleteItem.id,
                        );
                        cache.writeQuery({
                          query: GET_LIST_ITEMS,
                          variables: { id_is: listId },
                          data: {
                            getLists: [
                              {
                                __typename: 'List',
                                items: [...newCacheData],
                              },
                            ],
                          },
                        });
                      }}
                      onCompleted={() => {
                        navigation.goBack();
                      }}
                    >
                      {(deleteItem, { loading }) => (
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
                      <TouchableOpacity>
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

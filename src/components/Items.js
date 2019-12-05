/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Swipeable from 'react-native-swipeable';
import { orderBy } from 'lodash';

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
        status
      }
    }
  }
`;

const ITEM_ADDED = gql`
  subscription onItemAdded($listId: String!) {
    itemAdded(listId: $listId) {
      id
      title
      creator
      list
      status
    }
  }
`;

const ITEM_DELETED = gql`
  subscription onItemDeleted($listId: String!) {
    itemDeleted(listId: $listId) {
      id
      title
      creator
      list
      status
    }
  }
`;

const ITEM_EDITED = gql`
  subscription onItemEdited($listId: String!) {
    itemEdited(listId: $listId) {
      id
      title
      creator
      list
      status
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteItem($itemId: String!) {
    deleteItem(itemId: $itemId) {
      id
      title
      creator
      list
      status
    }
  }
`;

const UPDATE_ITEM_STATUS = gql`
  mutation updateItem($itemId: String!, $title: String!, $status: Boolean!) {
    updateItem(itemId: $itemId, title: $title, status: $status) {
      id
      title
      creator
      list
      status
    }
  }
`;

export const Items = ({ navigation, listId }) => {
  const { subscribeToMore, loading, error, data } = useQuery(GET_LIST_ITEMS, {
    variables: {
      id_is: listId,
    },
  });

  const [deleteItem] = useMutation(DELETE_ITEM);
  const [updateItem] = useMutation(UPDATE_ITEM_STATUS);

  if (loading) {
    return <Text>Loading . . . </Text>;
  }
  if (error) {
    return <Text>Error: ${error.message}</Text>;
  }

  const { getLists = [] } = data;

  subscribeToMore({
    document: ITEM_ADDED,
    variables: { listId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const { id } = subscriptionData.data.itemAdded;
      if (!prev.getLists[0].items.some(item => item.id === id)) {
        const newItems = {
          ...prev,
          getLists: [
            {
              ...prev.getLists[0],
              items: [
                { ...subscriptionData.data.itemAdded },
                ...prev.getLists[0].items,
              ],
            },
          ],
        };
        return newItems;
      }
      return prev;
    },
  });
  subscribeToMore({
    document: ITEM_DELETED,
    variables: { listId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const { id } = subscriptionData.data.itemDeleted;
      if (prev.getLists[0].items.some(item => item.id === id)) {
        const filteredItems = prev.getLists[0].items.filter(
          item => item.id !== id,
        );
        const newItems = {
          ...prev,
          getLists: [
            {
              ...prev.getLists[0],
              items: [...filteredItems],
            },
          ],
        };
        return newItems;
      }
      return prev;
    },
  });
  subscribeToMore({
    document: ITEM_EDITED,
    variables: { listId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const { id } = subscriptionData.data.itemEdited;
      if (prev.getLists[0].items.some(item => item.id === id)) {
        const noneEditItems = prev.getLists[0].items.filter(
          item => item.id !== id,
        );
        const newItems = {
          ...prev,
          getLists: [
            {
              ...prev.getLists[0],
              items: [
                ...noneEditItems,
                { ...subscriptionData.data.itemEdited },
              ],
            },
          ],
        };
        return newItems;
      }
      return prev;
    },
  });

  const [{ items }] = getLists;

  return (
    <FlatList
      data={orderBy(items, ['title'], ['asc'])}
      extraData={orderBy(items, ['title'], ['asc'])}
      renderItem={({ item }) => (
        <Swipeable
          style={[s.jcc, s.bb, s.b__ltext]}
          rightButtonWidth={60}
          leftContent={
            /* eslint-disable react/jsx-wrap-multilines */
            <View style={[s.flx_row, s.pa3, s.jcfe, s.bg_green]}>
              <Icon style={[s.ltext]} name="check" type="Feather" />
            </View>
          }
          onLeftActionComplete={() => {
            updateItem({
              refetchQueries: [
                {
                  query: GET_LIST_ITEMS,
                  variables: {
                    id_is: listId,
                  },
                },
              ],
              variables: {
                itemId: item.id,
                title: item.title,
                status: !item.status,
              },
            });
          }}
          leftActionActivationDistance={50}
          rightButtons={[
            <TouchableOpacity
              style={{ flexGrow: 1 }}
              onPress={() => {
                navigation.navigate('EditItem', { item, listId });
              }}
            >
              <View
                style={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  paddingLeft: 16,
                  backgroundColor: '#e1e1e1',
                }}
              >
                <Icon style={[s.white]} name="edit" type="MaterialIcons" />
              </View>
            </TouchableOpacity>,
            <TouchableOpacity
              style={{ flexGrow: 1 }}
              disabled={loading}
              onPress={() => {
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
                });
              }}
            >
              <View
                style={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  paddingLeft: 16,
                  backgroundColor: '#F4311D',
                }}
              >
                <Icon
                  style={[s.white]}
                  name="delete-forever"
                  type="MaterialCommunityIcons"
                />
              </View>
            </TouchableOpacity>,
          ]}
        >
          <TouchableOpacity style={[s.pa3]} onPress={() => {}}>
            <View style={[s.flx_row, s.aic]}>
              {item.status ? (
                <Icon
                  style={[s.aic, s.pr3, s.ltext]}
                  type="Feather"
                  name="check-square"
                />
              ) : (
                <Icon
                  style={[s.aic, s.pr3, s.ltext]}
                  type="Feather"
                  name="square"
                />
              )}
              <Text style={[s.aic, s.jcc, s.ltext]}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        </Swipeable>
      )}
      keyExtractor={item => item.id}
    />
  );
};

Items.displayName = 'Items';

Items.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  listId: PropTypes.string.isRequired,
};

import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Icon, Fab, Button } from 'native-base';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';

const DELETE_LIST = gql`
  mutation deleteList($listId: String!) {
    deleteList(listId: $listId) {
      id
      title
    }
  }
`;

const UPDATE_LIST = gql`
  mutation updateList($listId: String!, $title: String!) {
    updateList(listId: $listId, title: $title) {
      id
      title
    }
  }
`;

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

const deleteListMutation = ({ navigation, render }) => (
  <Mutation
    mutation={DELETE_LIST}
    update={(cache, { data }) => {
      const cacheData = cache.readQuery({ query: GET_MY_LISTS });
      const newCacheData = cacheData.getMyInfo.lists.filter(
        casheList => casheList.id !== data.deleteList.id,
      );
      cache.writeQuery({
        query: GET_MY_LISTS,
        data: {
          getMyInfo: {
            __typename: 'User',
            lists: [...newCacheData],
          },
        },
      });
    }}
    onCompleted={() => {
      navigation.navigate('Lists');
    }}
  >
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
);

const updateListMutation = ({ navigation, render }) => (
  <Mutation
    mutation={UPDATE_LIST}
    update={(cache, { data }) => {
      const cacheData = cache.readQuery({ query: GET_MY_LISTS });
      cacheData.getMyInfo.lists.filter(
        casheList => casheList.id === data.updateList.id,
        (listItem, index, orgArray) => {
          orgArray.splice(index, 1);
          cache.writeQuery({
            query: GET_MY_LISTS,
            data: {
              getMyInfo: {
                __typename: 'User',
                lists: [...orgArray, data.updateList],
              },
            },
          });
        },
      );
    }}
    onCompleted={() => {
      navigation.navigate('Lists');
    }}
  >
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
);

const ListMutations = adopt({
  deleteList: deleteListMutation,
  updateList: updateListMutation,
});

export class ItemsFab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  render() {
    const { navigation, list } = this.props;
    return (
      <ListMutations navigation={navigation}>
        {({ deleteList, updateList }) => (
          <Fab
            active={this.state.active}
            backgroundColor="#BAD500"
            position="bottomRight"
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#660066' }}
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon name="dots-three-horizontal" type="Entypo" />
            <Button
              style={{ backgroundColor: '#DD5144' }}
              onPress={() =>
                Alert.alert(
                  'Delete List',
                  `Are you sure you want to delete ${list.title} list?`,
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: async () =>
                        deleteList.mutation({
                          variables: {
                            listId: list.id,
                          },
                        }),
                    },
                  ],
                  { cancelable: false },
                )
              }
            >
              <Icon name="delete-circle" type="MaterialCommunityIcons" />
            </Button>
            <Button
              style={{ backgroundColor: '#F6B10B' }}
              onPress={() =>
                navigation.navigate('EditList', {
                  list,
                })
              }
            >
              <Icon name="edit" type="MaterialIcons" />
            </Button>
            <Button
              onPress={() =>
                navigation.navigate('AddListItem', {
                  list,
                })
              }
              style={{ backgroundColor: '#34A34F' }}
            >
              <Icon name="playlist-plus" type="MaterialCommunityIcons" />
            </Button>
            <Button disabled style={{ backgroundColor: '#3B5998' }}>
              <Icon name="share" type="MaterialIcons" />
            </Button>
          </Fab>
        )}
      </ListMutations>
    );
  }
}

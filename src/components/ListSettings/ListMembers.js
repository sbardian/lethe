/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { Button, Icon, Text, Toast } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';
import { adopt } from 'react-adopt';

const GET_LIST_USERS = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      owner
      users {
        id
        email
        username
      }
    }
  }
`;

const REMOVE_FROM_LIST = gql`
  mutation REMOVE_FROM_LIST($listId: String!, $userId: String!) {
    removeFromList(listId: $listId, userId: $userId) {
      id
      username
      email
    }
  }
`;

const GetUsers = ({ listId, render }) => (
  <Query query={GET_LIST_USERS} variables={{ id_is: listId }}>
    {render}
  </Query>
);

const RemoveUser = ({ render }) => (
  <Mutation
    mutation={REMOVE_FROM_LIST}
    update={() => console.log('updating after removing user')}
    onComplete={() => {
      Toast.show({
        text: `User removed from list.`,
        buttonText: 'Ok',
        type: 'success',
        position: 'bottom',
        duration: 3000,
      });
    }}
    onError={error => {
      Toast.show({
        text: `List title update failed: ${error.message}`,
        buttonText: 'Ok',
        type: 'danger',
        position: 'bottom',
        duration: 3000,
      });
    }}
    // update={(cache, { data }) => {
    //   const cacheData = cache.readQuery({ query: REMOVE_FROM_LIST });
    //   const newCacheData = cacheData.getMyInfo.lists.filter(
    //     casheList => casheList.id !== data.deleteList.id,
    //   );
    //   cache.writeQuery({
    //     query: GET_MY_LISTS,
    //     data: {
    //       getMyInfo: {
    //         __typename: 'User',
    //         lists: [...newCacheData],
    //       },
    //     },
    //   });
    // }}
  >
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
);

const Composed = adopt({
  getUsers: GetUsers,
  removeFromList: RemoveUser,
});

export class ListMembers extends Component {
  render() {
    const { listId, navigation } = this.props;
    return (
      <Composed listId={listId}>
        {({ getUsers, removeFromList }) => {
          if (getUsers.loading) {
            return <Text>Loading...</Text>;
          }
          const { owner, users } = getUsers.data.getLists[0];
          return (
            <View>
              <View style={[s.flx_row, s.jcsb]}>
                <View style={[s.flx_row, s.jcfs, s.pa3]}>
                  <Icon style={[s.f5, s.ltext]} type="Feather" name="users" />
                  <Text style={[s.asc, s.pl3, s.pr3, s.ltext]}>List Users</Text>
                </View>
                <Button
                  onPress={() =>
                    navigation.navigate('SendInvitation', {
                      listId,
                    })
                  }
                  style={{ backgroundColor: 'transparent' }}
                >
                  <Icon
                    name="person-add"
                    type="MaterialIcons"
                    style={{ color: '#666' }}
                  />
                </Button>
              </View>
              <FlatList
                data={users}
                renderItem={({ item }) => (
                  <View
                    style={[s.flx_row, s.jcsb, s.aic, s.pa2, s.bg_white, s.ma1]}
                  >
                    <Text>{item.username}</Text>
                    <Text>{item.email}</Text>
                    {owner === item.id ? <Text>Owner</Text> : null}
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          'Remove User',
                          `Are you sure you want to remove ${
                            item.username
                          } from list?`,
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: async () =>
                                removeFromList.mutation({
                                  variables: {
                                    listId,
                                    userId: item.id,
                                  },
                                }),
                            },
                          ],
                          { cancelable: false },
                        )
                      }
                    >
                      <Icon name="delete" type="Feather" />
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          );
        }}
      </Composed>
    );
  }
}

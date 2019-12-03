/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Icon, Text, Toast } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';

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

export const ListMembers = ({ listId, navigation }) => {
  const { loading, error, data } = useQuery(GET_LIST_USERS, {
    variables: {
      id_is: listId,
    },
  });

  const [removeFromList] = useMutation(REMOVE_FROM_LIST, {
    onComplete: () => {
      Toast.show({
        text: `User removed from list.`,
        buttonText: 'Ok',
        type: 'success',
        position: 'bottom',
        duration: 3000,
      });
    },
    onError: mutationError => {
      Toast.show({
        text: `List title update failed: ${mutationError.message}`,
        buttonText: 'Ok',
        type: 'danger',
        position: 'bottom',
        duration: 3000,
      });
    },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: ${error.message}</Text>;
  }

  const { getLists } = data;
  const [{ owner, users }] = getLists;

  return (
    <View>
      <View style={[s.flx_row, s.jcsb]}>
        <View style={[s.flx_row, s.jcfs, s.pa3]}>
          <Icon style={[s.f5, s.ltext]} type="Feather" name="users" />
          <Text style={[s.asc, s.pl3, s.pr3, s.ltext]}>List Users</Text>
        </View>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('SendInvitation', {
              listId,
            });
          }}
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
          <View style={[s.flx_row, s.jcsb, s.aic, s.pa2, s.bg_offWhite, s.ma1]}>
            <Text>{item.username}</Text>
            <Text>{item.email}</Text>
            {owner === item.id ? <Text>Owner</Text> : null}
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Remove User',
                  `Are you sure you want to remove ${item.username} from list?`,
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () =>
                        removeFromList({
                          variables: {
                            listId,
                            userId: item.id,
                          },
                          refetchQueries: [
                            {
                              query: GET_LIST_USERS,
                              variables: {
                                id_is: listId,
                              },
                            },
                          ],
                        }),
                    },
                  ],
                  { cancelable: false },
                );
              }}
            >
              <Icon name="delete" type="Feather" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

ListMembers.displayName = 'ListMembers';

ListMembers.propTypes = {
  listId: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

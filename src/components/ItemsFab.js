import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Icon, Fab, Button } from 'native-base';
import { ApolloConsumer, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_LIST = gql`
  mutation deleteList($listId: String!) {
    deleteList(listId: $listId) {
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
        {deleteList => (
          <Fab
            active={this.state.active}
            backgroundColor="#BAD500"
            position="bottomRight"
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
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
                        deleteList({
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
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="edit" type="FontAwesome" />
            </Button>
            <Button disabled style={{ backgroundColor: '#34A34F' }}>
              <Icon name="add-to-list" type="Entypo" />
            </Button>
          </Fab>
        )}
      </Mutation>
    );
  }
}

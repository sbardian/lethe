import React, { Component } from 'react';
import gql from 'graphql-tag';
import Modal from 'react-native-simple-modal';
import { View } from 'react-native';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, Item, Label, Text } from 'native-base';

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

export class UpdateList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { list, modalState, navigation } = this.props;
    return (
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
        {updateList => (
          <Modal
            open={false}
            offset={0}
            overlayBackground="rgba(0, 0, 0, 0.75)"
            animationDuration={200}
            animationTension={40}
            modalDidOpen={() => console.log('DeleteList Modal Open')}
            modalDidClose={() => console.log('DeleteList Modal Closed')}
            closeOnTouchOutside
            containerStyle={{
              justifyContent: 'center',
            }}
            modalStyle={{
              borderRadius: 2,
              margin: 20,
              padding: 10,
              backgroundColor: '#F5F5F5',
            }}
            disableOnBackPress={false}
          >
            <View>
              <Text>Update list {list.title}?</Text>
              <Button onPress={() => this.setState({ modalOpen: false })}>
                Cancel
              </Button>
              <Button
                onPress={() =>
                  updateList({
                    variables: {
                      listId: list.id,
                      title: 'NEWNEW',
                    },
                  })
                }
              >
                <Text>Ok</Text>
              </Button>
            </View>
          </Modal>
        )}
      </Mutation>
    );
  }
}

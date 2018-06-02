import React, { Component } from 'react';
import gql from 'graphql-tag';
import Modal from 'react-native-simple-modal';
import { View } from 'react-native';
import { Mutation } from 'react-apollo';
import { Button, Icon, Text } from 'native-base';

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

export class DeleteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
    };
  }

  componentDidMount() {
    this.setState({
      modalState: this.props.modalState,
    });
  }

  render() {
    const { list, modalState, navigation } = this.props;
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
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Modal
              open={modalState}
              overlayBackground="rgba(0, 0, 0, 0.75)"
              animationDuration={200}
              animationTension={40}
              modalDidOpen={() => console.log('DeleteList Modal Open')}
              modalDidClose={() => {
                console.log('DeleteList modal closed');
                this.setState({ modalState: false });
              }}
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
                <Text>Delete list {list.title}?</Text>
                {/* <Button
                onPress={() => this.setState({modalOpen: false})}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                onPress={async () => {
                  await deleteList({
                    variables: {
                      listId: list.id,
                    },
                  });
                }}
              >
                <Text>OK</Text>
              </Button> */}
              </View>
            </Modal>
          </View>
        )}
      </Mutation>
    );
  }
}

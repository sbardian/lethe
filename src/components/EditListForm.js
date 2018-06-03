import React, { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
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

export class EditListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      list: undefined,
    };
  }

  onTitleChange(value) {
    this.setState({
      title: value,
    });
  }

  render() {
    const { list, navigation } = this.props;
    return (
      <View>
        <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
          <Item floatingLabel>
            <Label>Title</Label>
            <Input
              value={list.title}
              id="ListTitle"
              onChangeText={value => this.onTitleChange(value)}
            />
          </Item>
        </Form>
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
          onCompleted={data => {
            navigation.navigate('Items', { list: data.updateList });
          }}
        >
          {(updateList, { loading }) => (
            <View>
              <Button
                full
                light
                disabled={loading}
                onPress={async () => {
                  await updateList({
                    variables: {
                      listId: list.id,
                      title: this.state.title,
                    },
                  });
                }}
              >
                <Text>OK</Text>
              </Button>
              <Button full light onPress={() => navigation.goBack()}>
                <Text>Cancel</Text>
              </Button>
            </View>
          )}
        </Mutation>
      </View>
    );
  }
}

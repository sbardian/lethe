import React, { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, Item, Label, Text } from 'native-base';

const ADD_ITEM = gql`
  mutation createNewItem($listId: String!, $title: String!) {
    createNewItem(ItemInfo: { list: $listId, title: $title }) {
      id
      title
      creator
      list
    }
  }
`;

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

export class AddListItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  onTitleChange(value) {
    this.setState({
      title: value,
    });
  }

  render() {
    const { navigation, listId } = this.props;
    return (
      <View>
        <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
          <Item stackedLabel>
            <Label>Title</Label>
            <Input
              id="ItemTitle"
              onChangeText={value => this.onTitleChange(value)}
            />
          </Item>
        </Form>
        <Mutation
          mutation={ADD_ITEM}
          onCompleted={() => {
            navigation.goBack();
          }}
        >
          {(createNewItem, { loading }) => (
            <Button
              full
              light
              disabled={loading}
              onPress={async () => {
                createNewItem({
                  refetchQueries: [
                    {
                      query: GET_LIST_ITEMS,
                      variables: {
                        id_is: listId,
                      },
                    },
                  ],
                  variables: {
                    title: this.state.title,
                    listId,
                  },
                });
              }}
            >
              <Text>Create</Text>
            </Button>
          )}
        </Mutation>
      </View>
    );
  }
}

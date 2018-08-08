import React, { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, Item, Label, Text } from 'native-base';

// const ADD_ITEM = gql`
//   mutation createNewItem($listId: String!, $title: String!) {
//     createNewItem(ItemInfo: { list: $listId, title: $title }) {
//       id
//       title
//       creator
//     }
//   }
// `;

const UPDATE_ITEM = gql`
  mutation updateItem($itemId: String!, $title: String!) {
    updateItem(itemId: $itemId, title: $title) {
      id
      title
      list
      creator
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
      }
    }
  }
`;

export class EditItemForm extends Component {
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
    const { navigation, listId, item } = this.props;
    const { title } = this.state;
    return (
      <View>
        <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
          <Item stackedLabel>
            <Label>Title</Label>
            <Input
              id="ItemTitle"
              placeholder={item.title}
              onChangeText={value => this.onTitleChange(value)}
            />
          </Item>
        </Form>
        <Mutation
          mutation={UPDATE_ITEM}
          onCompleted={() => {
            navigation.goBack();
          }}
        >
          {(updateItem, { loading }) => (
            <Button
              block
              light
              style={{ marginLeft: 20, marginRight: 20 }}
              disabled={loading}
              onPress={async () => {
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
                    title,
                    itemId: item.id,
                  },
                });
              }}
            >
              <Text>Save</Text>
            </Button>
          )}
        </Mutation>
      </View>
    );
  }
}

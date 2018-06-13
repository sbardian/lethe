import React, { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, Item, Label, Text } from 'native-base';

const ADD_ITEM = gql`
  mutation createNewItem($list: String!, $title: String!) {
    createNewItem(ItemInfo: { list: $list, title: $title }) {
      id
      title
      creator
    }
  }
`;

const GET_LIST_ITEMS = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      items {
        id
        title
        creator
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
    const { navigation, list } = this.props;
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
          update={(cache, { data }) => {
            const cacheData = cache.readQuery({
              query: GET_LIST_ITEMS,
              variables: { id_is: list.id },
            });
            console.log('cache = ', cacheData, ', data = ', data);
            cache.writeQuery({
              query: GET_LIST_ITEMS,
              variables: { id_is: list.id },
              data: {
                getLists: [
                  {
                    __typename: 'List',
                    items: [...cacheData.getLists[0].items, data.createNewItem],
                  },
                ],
              },
            });
          }}
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
                  variables: {
                    title: this.state.title,
                    list: list.id,
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

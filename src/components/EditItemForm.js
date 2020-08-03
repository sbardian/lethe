import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Button, Form, Input, Item, Label, Text } from 'native-base';
import { useMutation } from '@apollo/client';

const UPDATE_ITEM = gql`
  mutation updateItem($itemId: String!, $title: String!, $status: Boolean!) {
    updateItem(itemId: $itemId, title: $title, status: $status) {
      id
      title
      list
      creator
      status
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
        list
        creator
        status
      }
    }
  }
`;

export const EditItemForm = ({ navigation, listId, item }) => {
  const [title, setTitle] = React.useState('');

  const onTitleChange = (value) => {
    setTitle(value);
  };

  const [updateItem] = useMutation(UPDATE_ITEM, {
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
      status: item.status,
    },
    awaitRefetchQueries: true,
  });

  return (
    <View>
      <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
        <Item stackedLabel>
          <Label>Title</Label>
          <Input
            id="ItemTitle"
            placeholder={item.title}
            onChangeText={(value) => onTitleChange(value)}
          />
        </Item>
      </Form>
      <Button
        block
        light
        style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}
        onPress={() => {
          updateItem({ onCompleted: navigation.goBack() });
        }}
      >
        <Text>Save</Text>
      </Button>
    </View>
  );
};

EditItemForm.displayName = 'EditItemForm';

EditItemForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  listId: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
  }).isRequired,
};

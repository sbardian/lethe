import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Button, Form, Input, Item, Label, Text } from 'native-base';
import { useMutation } from '@apollo/react-hooks';

const ADD_ITEM = gql`
  mutation createNewItem($listId: String!, $title: String!) {
    createNewItem(ItemInfo: { list: $listId, title: $title }) {
      id
      title
      creator
      list
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
        creator
        list
        status
      }
    }
  }
`;

export const AddListItemForm = ({ navigation, listId }) => {
  const [title, setTitle] = React.useState('');

  const [createNewItem] = useMutation(ADD_ITEM, {
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
      listId,
    },
  });

  const onTitleChange = value => {
    setTitle(value);
  };

  return (
    <View>
      <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
        <Item stackedLabel>
          <Label>Title</Label>
          <Input id="ItemTitle" onChangeText={value => onTitleChange(value)} />
        </Item>
      </Form>
      <Button
        block
        light
        style={{ marginRight: 20, marginLeft: 20, marginBottom: 20 }}
        onPress={() => {
          createNewItem({
            onCompleted: navigation.goBack(),
          });
        }}
      >
        <Text>Create</Text>
      </Button>
    </View>
  );
};

AddListItemForm.displayName = 'AddListItemForm';

AddListItemForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  listId: PropTypes.string.isRequired,
};

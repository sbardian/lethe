import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Form, Input, Item, Label, Text } from 'native-base';

const ADD_LIST = gql`
  mutation createNewList($title: String!) {
    createNewList(ListInfo: { title: $title }) {
      id
      title
      owner
    }
  }
`;

const GET_MY_LISTS = gql`
  {
    getMyInfo {
      id
      lists {
        id
        title
        owner
      }
    }
  }
`;

export const AddListForm = ({ navigation }) => {
  const [title, setTitle] = React.useState('');

  const onTitleChange = (value) => {
    setTitle(value);
  };

  const [createNewList, { loading, error }] = useMutation(ADD_LIST, {
    variables: {
      title,
    },
    onCompleted: () => navigation.navigate('Lists'),
  });

  if (loading) {
    return <Text>Loading . . . </Text>;
  }
  if (error) {
    return <Text>{`Error: ${error.message}`}</Text>;
  }

  return (
    <View>
      <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
        <Item stackedLabel>
          <Label>Title</Label>
          <Input
            testID="list-title"
            id="ListTitle"
            onChangeText={(value) => onTitleChange(value)}
          />
        </Item>
      </Form>
      <Button
        testID="add-list-button"
        block
        light
        style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}
        disabled={loading}
        onPress={() => {
          createNewList({
            refetchQueries: [{ query: GET_MY_LISTS }],
          });
        }}
      >
        <Text>Create</Text>
      </Button>
    </View>
  );
};

AddListForm.displayName = 'AddListForm';

AddListForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

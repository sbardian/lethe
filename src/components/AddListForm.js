import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
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

export class AddListForm extends Component {
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
    const { navigation } = this.props;
    const { title } = this.state;

    return (
      <View>
        <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
          <Item stackedLabel>
            <Label>Title</Label>
            <Input
              id="ListTitle"
              onChangeText={value => this.onTitleChange(value)}
            />
          </Item>
        </Form>
        <Mutation
          mutation={ADD_LIST}
          onCompleted={() => {
            navigation.navigate('Lists');
          }}
        >
          {(createNewList, { loading }) => (
            <Button
              block
              light
              style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}
              disabled={loading}
              onPress={async () => {
                await createNewList({
                  refetchQueries: [{ query: GET_MY_LISTS }],
                  variables: {
                    title,
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

AddListForm.displayName = 'AddListForm';

AddListForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

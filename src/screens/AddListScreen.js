/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, Item, Label, Text } from 'native-base';
import { Screen } from '../screens';

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
      lists {
        id
        title
        owner
      }
    }
  }
`;

export class AddListScreen extends Component {
  static navigationOptions = {
    title: 'Add List',
    headerStyle: {
      backgroundColor: '#BAD500',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

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
    return (
      <Screen>
        <Form style={{ paddingBottom: 40, paddingRight: 20 }}>
          <Item floatingLabel>
            <Label>Title</Label>
            <Input
              id="ListTitle"
              onChangeText={value => this.onTitleChange(value)}
            />
          </Item>
        </Form>
        <Mutation
          mutation={ADD_LIST}
          update={(cache, { data }) => {
            const cacheData = cache.readQuery({ query: GET_MY_LISTS });
            cache.writeQuery({
              query: GET_MY_LISTS,
              data: {
                getMyInfo: {
                  __typename: 'User',
                  lists: [...cacheData.getMyInfo.lists, data.createNewList],
                },
              },
            });
          }}
          onCompleted={() => {
            this.props.navigation.navigate('Lists');
          }}
        >
          {(createNewList, { loading }) => (
            <Button
              full
              light
              disabled={loading}
              onPress={async () => {
                await createNewList({
                  variables: {
                    title: this.state.title,
                  },
                });
              }}
            >
              <Text>Create</Text>
            </Button>
          )}
        </Mutation>
      </Screen>
    );
  }
}

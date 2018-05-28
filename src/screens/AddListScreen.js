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
        <Text>Add List</Text>
        <Form>
          <Item floatingLabel>
            <Label>List Title</Label>
            <Input
              id="ListTitle"
              onChangeText={value => this.onTitleChange(value)}
            />
          </Item>
        </Form>
        <Mutation
          mutation={ADD_LIST}
          // TODO: add getLists query back in ? use getUsersLists? this sucks

          // update={(cache, { data }) => {
          //   console.log('return data list = ', data.createNewList);
          //   const cacheData = cache.readQuery({ query: GET_MY_LISTS });
          //   console.log('cache data lists = ', cacheData.getMyInfo.lists);
          //   const newData = {
          //     ...data.createNewList,
          //     'Symbol(id)': `List:${data.createNewList.id}`,
          //   };
          //   console.log('newData = ', newData);
          //   cache.writeQuery({
          //     query: GET_MY_LISTS,
          //     data: {
          //       getMyInfo: {
          //         __typename: 'User',
          //         lists: cacheData.getMyInfo.lists.push(newData),
          //       },
          //     },
          //   });
          // }}
          onCompleted={() => {
            this.props.navigation.navigate('Lists');
          }}
        >
          {(createNewList, { loading }) => (
            <Button
              full
              light
              bordered
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

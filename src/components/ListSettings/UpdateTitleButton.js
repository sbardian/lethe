/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, Item, Label, Text, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { styles as s } from 'react-native-style-tachyons';

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

export class UpdateTitleButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { list, title, titleNotChanged, onTitleSave } = this.props;
    return (
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
          Toast.show({
            text: `List title has been updated.`,
            buttonText: 'Ok',
            type: 'success',
            position: 'bottom',
            onClose: () => onTitleSave(data.updateList.title),
          });
        }}
      >
        {updateList => (
          <View>
            <Button
              bordered
              style={[s.mt3]}
              warning
              disabled={titleNotChanged}
              onPress={async () => {
                await updateList({
                  variables: {
                    listId: list.id,
                    title,
                  },
                });
              }}
            >
              <Text>Update</Text>
            </Button>
          </View>
        )}
      </Mutation>
    );
  }
}

UpdateTitleButton.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    users: PropTypes.array,
    items: PropTypes.array,
    owner: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
  titleNotChanged: PropTypes.bool,
  onTitleSave: PropTypes.func.isRequired,
};

UpdateTitleButton.defaultProps = {
  titleNotChanged: false,
  title: '',
};

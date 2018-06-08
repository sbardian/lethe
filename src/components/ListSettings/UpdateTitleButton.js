/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Animated, Easing, View } from 'react-native';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Icon, Text, Toast } from 'native-base';
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

  spinValue = new Animated.Value(0);

  componentDidMount() {
    this.animateLoading();
  }

  animateLoading() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
    }).start(() => this.animateLoading());
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
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
          onTitleSave(data.updateList.title);
          Toast.show({
            text: `List title has been updated.`,
            buttonText: 'Ok',
            type: 'success',
            position: 'bottom',
            duration: 3000,
          });
        }}
        onError={error => {
          Toast.show({
            text: `List title update failed: ${error.message}`,
            buttonText: 'Ok',
            type: 'danger',
            position: 'bottom',
            duration: 3000,
          });
        }}
      >
        {(updateList, { loading }) => (
          <View>
            <Button
              style={[s.mt3]}
              warning
              transparent
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
              {loading && (
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <Icon
                    name="loading"
                    type="MaterialCommunityIcons"
                    style={{ color: '#f0ad4e' }}
                  />
                </Animated.View>
              )}
              {!loading && <Icon name="edit-3" type="Feather" />}
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

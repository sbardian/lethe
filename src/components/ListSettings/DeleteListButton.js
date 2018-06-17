/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Animated, Easing, View } from 'react-native';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Icon, Toast } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';

const DELETE_LIST = gql`
  mutation deleteList($listId: String!) {
    deleteList(listId: $listId) {
      id
      title
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

export class DeleteListButton extends Component {
  componentDidMount() {
    this.animateLoading();
  }

  spinValue = new Animated.Value(0);

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
    const { active, listId, navigation } = this.props;
    return (
      <Mutation
        mutation={DELETE_LIST}
        // update={(cache, { data }) => {
        //   const cacheData = cache.readQuery({ query: GET_MY_LISTS });
        //   const newCacheData = cacheData.getMyInfo.lists.filter(
        //     casheList => casheList.id !== data.deleteList.id,
        //   );
        //   cache.writeQuery({
        //     query: GET_MY_LISTS,
        //     data: {
        //       getMyInfo: {
        //         __typename: 'User',
        //         lists: [...newCacheData],
        //       },
        //     },
        //   });
        // }}
        onCompleted={() => {
          navigation.navigate('Lists');
          // Toast.show({
          //   text: `List ${data.deleteList.title} has been deleted.`,
          //   buttonText: 'Ok',
          //   type: 'success',
          //   position: 'bottom',
          //   onClose: () => navigation.navigate('Lists'),
          //   duration: 3000,
          // });
        }}
        onError={error => {
          Toast.show({
            text: `Delete Failed: ${error.message}`,
            buttonText: 'Ok',
            type: 'danger',
            position: 'bottom',
            duration: 3000,
          });
        }}
      >
        {(deleteList, { loading }) => (
          <View>
            <Button
              style={[s.mt3]}
              warning
              transparent
              disabled={active}
              onPress={async () =>
                deleteList({
                  refetchQueries: [{ query: GET_MY_LISTS }],
                  variables: {
                    listId,
                  },
                })
              }
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
              {!loading && (
                <Icon name="delete-forever" type="MaterialCommunityIcons" />
              )}
            </Button>
          </View>
        )}
      </Mutation>
    );
  }
}

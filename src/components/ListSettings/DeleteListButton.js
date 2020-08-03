/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, View } from 'react-native';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
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

export const DeleteListButton = ({ navigation, listId, active }) => {
  const [deleteList, { loading }] = useMutation(DELETE_LIST, {
    onCompleted: () => {
      navigation.navigate('Lists');
    },
    onError: (error) => {
      Toast.show({
        text: `Delete Failed: ${error.message}`,
        buttonText: 'Ok',
        type: 'danger',
        position: 'bottom',
        duration: 3000,
      });
    },
  });
  const spinValue = new Animated.Value(0);

  const animateLoading = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
    }).start(() => animateLoading());
  };

  React.useEffect(() => {
    animateLoading();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View>
      <Button
        style={[s.mt3]}
        warning
        transparent
        disabled={active}
        onPress={() => {
          deleteList({
            refetchQueries: [{ query: GET_MY_LISTS }],
            variables: {
              listId,
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
        {!loading && (
          <Icon name="delete-forever" type="MaterialCommunityIcons" />
        )}
      </Button>
    </View>
  );
};

DeleteListButton.displayName = 'DeleteListButton';

DeleteListButton.propTypes = {
  active: PropTypes.bool.isRequired,
  listId: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

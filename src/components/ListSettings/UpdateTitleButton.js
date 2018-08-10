/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, View } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Icon, Toast } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';

const UPDATE_LIST = gql`
  mutation updateList($listId: String!, $title: String!) {
    updateList(listId: $listId, title: $title) {
      id
      title
    }
  }
`;

export class UpdateTitleButton extends Component {
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
    const { listId, newTitle, titleNotChanged, onTitleSave } = this.props;
    return (
      <Mutation
        mutation={UPDATE_LIST}
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
                    listId,
                    title: newTitle,
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
  listId: PropTypes.string.isRequired,
  newTitle: PropTypes.string,
  titleNotChanged: PropTypes.bool,
  onTitleSave: PropTypes.func.isRequired,
};

UpdateTitleButton.defaultProps = {
  titleNotChanged: false,
  newTitle: '',
};

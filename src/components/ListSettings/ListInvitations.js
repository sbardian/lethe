import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { styles as s } from 'react-native-style-tachyons';

const GET_LIST_INVITATIONS = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      owner
      invitations {
        id
        inviter {
          id
          username
          email
        }
        invitee
        list
        title
      }
    }
  }
`;

export class ListInvitations extends Component {
  state = {};

  render() {
    const { listId } = this.props;

    return (
      <Query query={GET_LIST_INVITATIONS} variables={{ id_is: listId }}>
        {({ loading, error, data: { getLists = [] } }) => {
          if (loading) {
            return <Text>Loading...</Text>;
          }
          const list = getLists[0];
          return (
            <View>
              <Text>{`list id ${listId}:${getLists[0]}`}</Text>
            </View>
          );
        }}
      </Query>
    );
  }
}

ListInvitations.propTypes = {};

ListInvitations.defaultProps = {};

/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button, Icon, Text, Toast } from 'native-base';
import { styles as s } from 'react-native-style-tachyons';

const GET_LIST_USERS = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      owner
      users {
        id
        email
        username
      }
    }
  }
`;

export class ListMembers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { list } = this.props;
    return (
      <Query query={GET_LIST_USERS} variables={{ id_is: list.id }}>
        {({ loading, error, data: { getLists = [] } }) => {
          if (loading) {
            return <Text>Loading . . . </Text>;
          }
          if (error) {
            return <Text>Error: ${error.message}</Text>;
          }
          const owner = getLists[0].owner;
          return (
            <View>
              <View style={[s.flx_row, s.jcfe, s.pr3]}>
                <Icon name="add" />
              </View>
              <FlatList
                data={getLists[0].users}
                renderItem={({ item }) => (
                  <View style={[s.flx_row, s.jcsb, s.pa3, s.bb, s.bg_white]}>
                    <Text>{item.username}</Text>
                    <Text>{item.email}</Text>
                    {owner === item.id ? <Text>Owner</Text> : ''}
                    <Icon name="delete" type="Feather" />
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          );
        }}
      </Query>
    );
  }
}

/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { Body, Icon, Text, Card, Thumbnail, CardItem } from 'native-base';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { styles as s } from 'react-native-style-tachyons';
import { DeclineInvitationIcon } from '../DeclineInvitationIcon';

const GET_LIST_INVITATIONS = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      owner
      invitations {
        id
        title
        invitee {
          id
          username
          profileImageUrl
          email
        }
        inviter {
          id
          username
          profileImageUrl
          email
        }
      }
    }
  }
`;

const GET_INVITEE = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      id
      username
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
          if (error) {
            return <Text>Something went wrong, please try again.</Text>;
          }

          const { invitations } = getLists[0];

          console.log('invitation invitee: ', invitations);

          return (
            <View>
              <View style={[s.flx_row, s.jcsb]}>
                <View style={[s.flx_row, s.jcfs, s.pa3]}>
                  <Icon
                    style={[s.f5, s.ltext]}
                    type="MaterialIcons"
                    name="insert-invitation"
                  />
                  <Text style={[s.asc, s.pl3, s.pr3, s.ltext]}>
                    List Invitations
                  </Text>
                </View>
              </View>
              <FlatList
                bordered
                data={invitations}
                renderItem={({ item }) => (
                  <Card>
                    <CardItem bordered>
                      <Thumbnail
                        circle
                        small
                        style={{ marginRight: 10 }}
                        source={
                          item.inviter.profileImageUrl
                            ? {
                                uri: `https://${item.inviter.profileImageUrl}`,
                              }
                            : require('../../images/defaultProfile.jpg')
                        }
                      />
                      <Text style={[s.mr3]}>
                        {`Invitation from: ${item.inviter.username} to ${
                          item.invitee.username
                        }`}
                      </Text>
                      <DeclineInvitationIcon
                        iconColor="#a01c1c"
                        buttonProps={{
                          danger: true,
                          style: {
                            backgroundColor: 'transparent',
                          },
                        }}
                        invitationId={item.id}
                      />
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>{`Message: ${item.title}`}</Text>
                      </Body>
                    </CardItem>
                  </Card>
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

ListInvitations.propTypes = {
  listId: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

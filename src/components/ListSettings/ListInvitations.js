/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { Body, H3, Icon, Text, Card, Thumbnail, CardItem } from 'native-base';
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
        invitee
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
                  // TODO: make getUser none admin, or make invitee return User not String
                  <Query
                    query={GET_INVITEE}
                    variables={{ userId: item.invitee }}
                  >
                    {({
                      loading: inviteeLoading,
                      error: inviteeError,
                      data: { getUser },
                    }) => {
                      if (inviteeLoading) {
                        return <Text>Loading...</Text>;
                      }
                      if (inviteeError) {
                        return <Text>Error loading invitee...</Text>;
                      }
                      console.log('invitee: ', getUser);

                      return (
                        <Card>
                          <CardItem header bordered>
                            <Thumbnail
                              circle
                              small
                              style={{ marginRight: 10 }}
                              source={
                                item.inviter.profileImageUrl
                                  ? {
                                      uri: `https://${
                                        item.inviter.profileImageUrl
                                      }`,
                                    }
                                  : require('../../images/defaultProfile.jpg')
                              }
                            />
                            <Text>
                              {`Invitation from: ${item.inviter.username}`}
                            </Text>
                          </CardItem>
                          <CardItem>
                            <Body>
                              <H3>{item.title}</H3>
                            </Body>
                          </CardItem>
                          <View
                            style={(s.flx_i, [s.flx_row, s.jcsa, s.aic, s.pa3])}
                          >
                            <DeclineInvitationIcon
                              buttonText="Delete"
                              invitationId={item.id}
                            />
                          </View>
                        </Card>
                      );
                    }}
                  </Query>
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

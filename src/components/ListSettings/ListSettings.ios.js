import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { styles as s } from 'react-native-style-tachyons';
import { Form, Input, Item, Label, Text } from 'native-base';
import { UpdateTitleButton } from './UpdateTitleButton';
import { DeleteListButton } from './DeleteListButton';
import { ListMembers } from './ListMembers';
import { ListInvitations } from './ListInvitations';

const GET_LIST = gql`
  query getLists($id_is: String!) {
    getLists(id_is: $id_is) {
      id
      title
    }
  }
`;

export const ListSettings = ({ navigation, title, listId }) => {
  const [newTitle, setNewTitle] = React.useState('');
  const [orgTitle] = React.useState(title);
  const [titleNotChanged, setTitleNotChanged] = React.useState(true);
  const [deleteConfirmed, setDeleteConfirmed] = React.useState(true);

  const onTitleChange = value => {
    setNewTitle(value);
    setTitleNotChanged(false);
  };

  const onDeleteTitleChange = value => {
    if (orgTitle === value) {
      setDeleteConfirmed(false);
    } else {
      setDeleteConfirmed(true);
    }
  };

  const handleTitleSave = value => {
    setNewTitle(value);
    setTitleNotChanged(true);
  };

  const { loading, error, data } = useQuery(GET_LIST, {
    variables: { id_is: listId },
  });

  if (loading) {
    return <Text>Loading . . . </Text>;
  }
  if (error) {
    return <Text>Error: ${error.message}</Text>;
  }

  const { getLists } = data;

  const [{ id }] = getLists;

  return (
    <View>
      <Form>
        <View style={[s.flx_row, s.jcsb, s.pb4]}>
          <Item style={{ flexGrow: 1 }} stackedLabel>
            <Label>Title</Label>
            <Input
              autoCapitalize="none"
              placeholder={orgTitle}
              id="ListTitle"
              onChangeText={value => onTitleChange(value)}
            />
          </Item>
          <UpdateTitleButton
            listId={id}
            newTitle={newTitle}
            titleNotChanged={titleNotChanged}
            onTitleSave={() => handleTitleSave()}
          />
        </View>
      </Form>
      <Form>
        <View style={[s.flx_row, s.jcsb, s.pb4]}>
          <Item style={{ flexGrow: 1 }} stackedLabel>
            <Label>Enter list title to confirm delete:</Label>
            <Input
              autoCapitalize="none"
              placeholder={orgTitle}
              id="DeleteListTitle"
              onChangeText={value => onDeleteTitleChange(value)}
            />
          </Item>
          <DeleteListButton
            active={deleteConfirmed}
            navigation={navigation}
            listId={id}
            title={orgTitle}
          />
        </View>
      </Form>
      <View style={{ paddingBottom: 40 }}>
        {<ListMembers navigation={navigation} listId={id} />}
      </View>
      <View style={{ paddingBottom: 40 }}>
        {<ListInvitations navigation={navigation} listId={id} />}
      </View>
    </View>
  );
};

ListSettings.displayName = 'ListSettings';

ListSettings.propTypes = {
  title: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

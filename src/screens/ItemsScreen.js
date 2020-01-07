/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { AddItemFab, Items } from '../components';
import { Screen } from './Screen';

export const ItemsScreen = ({ navigation }) => {
  const listId = navigation.getParam('listId');

  return (
    <Screen fab={<AddItemFab navigation={navigation} listId={listId} />}>
      <Grid>
        <Row>
          <Items listId={listId} navigation={navigation} />
        </Row>
      </Grid>
    </Screen>
  );
};

ItemsScreen.navigationOptions = ({ navigation }) => {
  const listId = navigation.getParam('listId');
  const title = navigation.getParam('title');
  return {
    headerStyle: {
      backgroundColor: '#FF5254',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
      <Button
        transparent
        onPress={() => {
          navigation.navigate('ListSettings', {
            listId,
            title,
          });
        }}
        title="Info"
        color="#fff"
      >
        <Icon style={{ color: 'white' }} name="settings" type="Octicons" />
      </Button>
    ),
  };
};

ItemsScreen.displayName = 'ItemsScreen';

ItemsScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

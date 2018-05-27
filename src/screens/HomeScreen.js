/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Row, Grid } from 'react-native-easy-grid';
import { Icon, Text, Thumbnail, Button } from 'native-base';
import { MyInfo, Lists } from '../components';
import { Screen } from '../screens';

const styles = {
  alignCenter: {
    alignSelf: 'center',
  },
};

export class HomeScreen extends Component {
  render() {
    return (
      <Screen
        headerButtonAction={() => this.props.navigation.toggleDrawer()}
        headerIcon={<Icon name="menu" />}
        headerTitle="Home"
      >
        <Grid>
          <Row size={1} style={styles.alignCenter}>
            <Thumbnail
              large
              source={require('../images/background-grid.png')}
            />
          </Row>
          <Row size={1} style={styles.alignCenter}>
            <MyInfo />
          </Row>
          <Row size={2} style={styles.alignCenter}>
            <Text>Lists</Text>

            <Lists />
          </Row>
        </Grid>
      </Screen>
    );
  }
}

/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

export const TokenContext = React.createContext();

export class TokenProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: undefined,
      setToken: this.setToken,
      removeToken: this.removeToken,
    };
  }

  setToken = async token => {
    this.setState({
      token,
    });
    try {
      console.log('setting token in storage: ', token);
      await AsyncStorage.setItem('@letheStore:token', token);
    } catch (error) {
      throw new Error('Error storing token.');
    }
  };

  removeToken = async () => {
    this.setState({
      token: undefined,
    });
    await AsyncStorage.removeItem('@letheStore:token');
  };

  render() {
    return (
      <TokenContext.Provider value={this.state}>
        {this.props.children}
      </TokenContext.Provider>
    );
  }
}

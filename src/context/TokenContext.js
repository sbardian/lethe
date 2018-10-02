/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { children } = this.props;
    return (
      <TokenContext.Provider value={this.state}>
        {children}
      </TokenContext.Provider>
    );
  }
}

TokenProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

TokenProvider.defaultProps = {
  children: null,
};

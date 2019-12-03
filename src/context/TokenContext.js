/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';

export const TokenContext = React.createContext();

export const TokenProvider = ({ children }) => {
  const [token, updateToken] = React.useState(null);

  const setToken = async newToken => {
    updateToken(newToken);
    try {
      await AsyncStorage.setItem('@letheStore:token', newToken);
    } catch (error) {
      throw new Error('Error storing token.');
    }
  };

  const removeToken = async () => {
    updateToken(undefined);
    await AsyncStorage.removeItem('@letheStore:token');
  };

  const value = {
    token,
    setToken,
    removeToken,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

TokenProvider.propTypes = {
  children: PropTypes.node,
};

TokenProvider.defaultProps = {
  children: null,
};

/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export const tokenContext = React.createContext({
  token: 'defaultToken',
  setToken: () => {},
});

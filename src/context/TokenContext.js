/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export const TokenContext = React.createContext();

export class TokenProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: undefined,
      setToken: this.setToken,
    };
  }

  setToken = token => {
    this.setState({
      token,
    });
  };

  render() {
    return (
      <TokenContext.Provider value={this.state}>
        {this.props.children}
      </TokenContext.Provider>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';

export const Screen = ({ children, fab }) => (
  <Container>
    {children}
    {fab}
  </Container>
);

Screen.propTypes = {
  children: PropTypes.node,
  fab: PropTypes.node,
};

Screen.defaultProps = {
  children: null,
  fab: null,
};

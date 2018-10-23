import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';

export const Screen = ({ children, fab }) => (
  <Container>
    <Content>{children}</Content>
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

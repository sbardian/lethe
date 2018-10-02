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
  children: PropTypes.arrayOf(PropTypes.node),
  fab: PropTypes.func,
};

Screen.defaultProps = {
  children: null,
  fab: () => {},
};

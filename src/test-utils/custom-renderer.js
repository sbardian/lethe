import React from 'react';
// eslint-disable-next-line
import { render } from '@testing-library/react-native';
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/client';
// eslint-disable-next-line
import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import ApolloClient from 'apollo-boost';

const link = createHttpLink({
  uri: 'https://fakenews.org/graphql',
  fetch,
});

const mockClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const AllTheProviders = ({ children }) => {
  return <ApolloProvider client={mockClient}>{children}</ApolloProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
// eslint-disable-next-line
export * from '@testing-library/react-native';

// override render method
export { customRender as render };

// import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-native/extend-expect';
import { cleanup } from '@testing-library/react-native';
import { server } from './src/test-utils/mock-server';

beforeAll(async () => {
  try {
    server.listen();
    // console.log('Server status: 😺');
  } catch (error) {
    // console.log('Server status: 🙀');
  }
});
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers());
afterEach(cleanup);
afterAll(() => server.close());

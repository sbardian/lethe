import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
} from '../test-utils/custom-renderer';
import { CreateAccountForm } from './CreateAccountForm';

const onSetToken = jest.fn();

afterEach(() => cleanup);

const setup = () => {
  const utils = render(
    <CreateAccountForm pageScroll onSetToken={onSetToken} />,
  );
  const username = utils.getByTestId('register-username');
  const email = utils.getByTestId('register-email');
  const password = utils.getByTestId('register-password');
  const passwordConf = utils.getByTestId('register-password-confirm');
  const createButton = utils.getByTestId('register-button');
  return {
    ...utils,
    username,
    email,
    password,
    passwordConf,
    createButton,
  };
};

const setupCase = () => {
  const utils = setup();
  const changeInput = (elm, value) => {
    fireEvent.changeText(elm, value);
  };
  return {
    ...utils,
    changeInput,
  };
};

describe('CreateAccountForm', () => {
  it('Render create account form and click, success', async () => {
    const {
      username,
      email,
      password,
      passwordConf,
      createButton,
      changeInput,
      queryByText,
    } = setupCase();
    changeInput(username, 'bob');
    changeInput(email, 'bob@mock.com');
    changeInput(password, 'bob');
    changeInput(passwordConf, 'bob');
    fireEvent.press(createButton);
    await waitFor(() => expect(queryByText('Error')).toBeNull());
    await waitFor(() => expect(queryByText('Loading . . . ')).toBeNull());
    await waitFor(() => expect(onSetToken).toHaveBeenCalledTimes(1));
  });
  it('Render create account form, check disabling create account button', async () => {
    const {
      username,
      email,
      password,
      passwordConf,
      createButton,
      changeInput,
    } = setupCase();
    changeInput(username, 'bob');
    changeInput(email, 'bob@mock.com');
    changeInput(password, 'bob');
    changeInput(passwordConf, 'wrong-password');
    expect(createButton).toBeDisabled();
    changeInput(passwordConf, 'bob');
    expect(createButton).toBeEnabled();
  });
  it('Render create account form, check failed signup attempt', async () => {
    const {
      username,
      email,
      password,
      passwordConf,
      createButton,
      changeInput,
      queryByTestId,
      queryByText,
    } = setupCase();
    changeInput(username, 'bob');
    changeInput(email, 'bob@mock.com');
    changeInput(password, 'forceFail');
    changeInput(passwordConf, 'forceFail');
    fireEvent.press(createButton);
    await waitFor(() => queryByTestId('create-account-error'));
    await waitFor(() =>
      expect(
        queryByText(
          'Error: GraphQL error: An error has occured. . . the sadness',
        ),
      ).toBeTruthy(),
    );
    await waitFor(() => expect(onSetToken).toHaveBeenCalledTimes(0));
  });
});

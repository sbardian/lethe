import React from 'react';
import { render, fireEvent, wait } from '../test-utils/custom-renderer';
import { CreateAccountForm } from './CreateAccountForm';

const onSetToken = jest.fn();

describe('CreateAccountForm', () => {
  it('Render create account form and click, success', async () => {
    const { getByTestId, queryByText } = render(
      <CreateAccountForm pageScroll onSetToken={onSetToken} />,
    );
    const username = getByTestId('register-username');
    const email = getByTestId('register-email');
    const password = getByTestId('register-password');
    const passwordConf = getByTestId('register-password-confirm');
    const createButton = getByTestId('register-button');
    fireEvent.changeText(username, 'bob');
    fireEvent.changeText(email, 'bob@mock.com');
    fireEvent.changeText(password, 'bob');
    fireEvent.changeText(passwordConf, 'bob');
    fireEvent.press(createButton);
    await wait(() => expect(queryByText('Error')).toBeNull());
    await wait(() => expect(queryByText('Loading . . . ')).toBeNull());
    await wait(() => expect(onSetToken).toHaveBeenCalledTimes(1));
  });
  it('Render create account form, check disabling create account button', async () => {
    const { getByTestId, queryByTestId } = render(
      <CreateAccountForm pageScroll onSetToken={onSetToken} />,
    );
    const username = getByTestId('register-username');
    const email = getByTestId('register-email');
    const password = getByTestId('register-password');
    const passwordConf = getByTestId('register-password-confirm');
    const createButton = queryByTestId('register-button');
    fireEvent.changeText(username, 'bob');
    fireEvent.changeText(email, 'bob@mock.com');
    fireEvent.changeText(password, 'bob');
    fireEvent.changeText(passwordConf, 'wrong-password');
    expect(createButton).toBeDisabled();
    fireEvent.changeText(passwordConf, 'bob');
    expect(createButton).toBeEnabled();
  });
  it('Render create account form, check failed signup attempt', async () => {
    const { getByTestId, queryByTestId, queryByText } = render(
      <CreateAccountForm pageScroll onSetToken={onSetToken} />,
    );
    const username = getByTestId('register-username');
    const email = getByTestId('register-email');
    const password = getByTestId('register-password');
    const passwordConf = getByTestId('register-password-confirm');
    const createButton = queryByTestId('register-button');
    fireEvent.changeText(username, 'bob');
    fireEvent.changeText(email, 'bob@mock.com');
    fireEvent.changeText(password, 'forceFail');
    fireEvent.changeText(passwordConf, 'forceFail');
    fireEvent.press(createButton);
    await wait(() => queryByTestId('create-account-error'));
    expect(
      queryByText(
        'Error: GraphQL error: An error has occured. . . the sadness',
      ),
    ).toBeTruthy();
    await wait(() => expect(onSetToken).toHaveBeenCalledTimes(0));
  });
});

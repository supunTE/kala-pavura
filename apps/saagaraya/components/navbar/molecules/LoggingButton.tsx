'use client';

import { Button, Loader } from '@mantine/core';
import { CaretRight, SignOut } from '@phosphor-icons/react';
import cs from 'classnames';

import { UserLoginState } from '@kala-pavura/models';

import { useAuth } from '@/modules/context';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store/store';
import { LOGIN_OR_REGISTER_DIALOG } from '@/constants/dialogs';

export function LoggingButton() {
  const { userLoggingState, logout } = useAuth();
  const dispatch = useDispatch<Dispatch>()
  const loginDialogVisibility = useSelector((state: RootState) => state.ui.dialogVisibility[LOGIN_OR_REGISTER_DIALOG] || false);


  switch (userLoggingState) {
    case UserLoginState.LoadingData:
      return (
        <Button
          variant="filled"
          color="#2da1e4"
          size="xs"
          radius="xl"
          leftSection={<Loader size={20} color="white" />}>
          පූරණය වෙමින්...
        </Button>
      );
    case UserLoginState.LoggedIn:
      return (
        <Button
          variant="filled"
          color="red"
          size="xs"
          radius="xl"
          rightSection={<SignOut size={16} weight="light" />}
          onClick={() => logout?.()}>
          ඉවත්වන්න
        </Button>
      );
    case UserLoginState.LoggedOut:
      return (
        <Button
          onClick={() => dispatch.ui.updateDialogVisibilityReducer({
            key: LOGIN_OR_REGISTER_DIALOG,
            visible: true,
          })}
          variant="filled"
          color="#2da1e4"
          size="xs"
          radius="xl"
          className={cs({ 'opacity-50': loginDialogVisibility })}
          rightSection={<CaretRight size={16} weight="light" />}>
          එක්වන්න
        </Button>
      );
  }
}

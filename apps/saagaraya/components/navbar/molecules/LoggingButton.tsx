import { MutableRefObject } from 'react';
import { Button, Loader } from '@mantine/core';
import { CaretRight, SignOut } from '@phosphor-icons/react';
import cs from 'classnames';

import { UserLoginState } from '@kala-pavura/models';

import { useAuth } from '@/modules/context';

type LoggingButtonProps = {
  isLoginClicked: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loggingButton: MutableRefObject<any>;
};

export function LoggingButton({
  isLoginClicked,
  loggingButton,
}: LoggingButtonProps) {
  const { userLoggingState, logout } = useAuth();

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
          ref={loggingButton}
          variant="filled"
          color="#2da1e4"
          size="xs"
          radius="xl"
          className={cs({ 'opacity-50': isLoginClicked })}
          rightSection={<CaretRight size={16} weight="light" />}>
          එක්වන්න
        </Button>
      );
  }
}

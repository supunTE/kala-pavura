'use client';

import { MutableRefObject } from 'react';
import { Button, Input, Loader } from '@mantine/core';
import { CaretRight, MagnifyingGlass, SignOut } from '@phosphor-icons/react';
import cs from 'classnames';
import Image from 'next/image';

import { UserLoginState } from '@kala-pavura/models';

import { AuthModalComponent } from '@/components/auth-modal';
import { useAuth } from '@/modules/context';
import { useMouseClickOpen } from '@/modules/hooks';

export function NavbarControls() {
  const {
    isOpened: isLoginClicked,
    clickableAreaRef: loginButton,
    insideContainerRef: authModalContainer,
    forceClose: forceCloseAuthModal,
  } = useMouseClickOpen();

  const { user } = useAuth();

  return (
    <div className="z-10 flex items-center justify-center gap-4">
      <Input
        size="xs"
        fz="lg"
        radius="xl"
        placeholder="කිමිදෙන්න"
        autoComplete="off"
        className={cs('h-full w-80')}
        leftSection={<MagnifyingGlass size={14} weight="light" />}
      />

      {user && (
        <div className="h-full">
          <Image
            src={user.profilePicture}
            alt="google logo"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        </div>
      )}

      <LoggingButton
        isLoginClicked={isLoginClicked}
        loggingButton={loginButton}
      />

      <AuthModalComponent
        isOpen={isLoginClicked}
        forceClose={forceCloseAuthModal}
        ref={authModalContainer}
      />
    </div>
  );
}

type LoggingButtonProps = {
  isLoginClicked: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loggingButton: MutableRefObject<any>;
};
function LoggingButton({ isLoginClicked, loggingButton }: LoggingButtonProps) {
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

'use client';

import { MutableRefObject } from 'react';
import { UserLoginState } from '@kala-pavura/models';
import { Button, Input, Loader } from '@mantine/core';
import { CaretRight, MagnifyingGlass, SignOut } from '@phosphor-icons/react';
import cs from 'classnames';
import Image from 'next/image';

import { AuthModalComponent } from '@/components/AuthModal.component';
import { useAuth } from '@/modules/context/AuthContext';
import { useMouseClickOpen } from '@/modules/hooks/useMouseClick';

export function NavbarControls() {
  const {
    isOpened: isLoginClicked,
    clickableAreaRef: loginButton,
    insideContainerRef: authModalContainer,
    forceClose: forceCloseAuthModal,
  } = useMouseClickOpen();

  const { user } = useAuth();

  return (
    <div className={cs('flex gap-4 z-20')}>
      <Input
        size="xs"
        radius="xl"
        placeholder="කිමිදෙන්න"
        className={cs('w-80')}
        leftSection={<MagnifyingGlass size={14} weight="light" />}
      />

      {user && (
        <Image
          src={user.profilePicture}
          alt="google logo"
          width={32}
          height={32}
          className={cs('rounded-full')}
        />
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
          leftSection={<Loader size={20} />}>
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

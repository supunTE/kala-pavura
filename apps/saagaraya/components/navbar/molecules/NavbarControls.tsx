'use client';

import { useDispatch } from 'react-redux';
import { Input } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import Image from 'next/image';

import { AuthModalComponent } from '@/components/auth-modal';
import { useAuth } from '@/modules/context';
import { Dispatch } from '@/store/store';

import { LoggingButton } from './LoggingButton';
import { NavLinks } from './NavLinks';

export function NavbarControls() {
  const { user } = useAuth();

  return (
    <div className="flex gap-4">
      <NavLinks />
      <div className="z-50 flex flex-row items-center justify-center gap-4">
        <Input
          size="sm"
          fz="lg"
          radius="xl"
          placeholder="කිමිදෙන්න"
          autoComplete="off"
          className={'hidden h-full w-48 sm:block'}
          leftSection={<MagnifyingGlass size={12} weight="light" />}
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

        <LoggingButton/>
      </div>
      {/*<div className="absolute left-0 sm:inset-x-auto sm:right-4 sm:top-14">*/}
      {/*</div>*/}
    </div>
  );
}

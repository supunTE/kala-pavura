'use client';

import { Button, Input } from '@mantine/core';
import { CaretRight, MagnifyingGlass } from '@phosphor-icons/react';
import cs from 'classnames';
import Image from 'next/image';

import logo from '../assets/images/logo.png';

export function NavBar() {
  if (typeof window !== 'undefined') console.log('window', window);

  return (
    <div
      className={cs(
        'absolute inset-0 py-4 px-8',
        'flex items-start justify-center gap-6',
      )}>
      <div
        className={cs(
          'bg-zinc-700/40 backdrop-blur-md',
          'p-3',
          'rounded-full',
          'border border-zinc-400/20',
          'h-16',
        )}>
        <Image
          src={logo}
          alt="logo"
          className={cs('h-full w-min', 'object-contain')}
        />
      </div>

      <nav
        className={cs(
          'h-16 w-full',
          'px-4',
          'border border-zinc-400/20',
          'bg-zinc-700/40 backdrop-blur-md',
          'rounded-full',
          'flex items-center justify-end gap-6',
          'relative overflow-hidden',
        )}>
        <Input
          size="xs"
          radius="xl"
          placeholder="කිමිදෙන්න"
          className={cs('w-80', 'z-20')}
          leftSection={<MagnifyingGlass size={14} weight="light" />}
        />
        <Button
          variant="filled"
          color="#2da1e4"
          size="xs"
          radius="xl"
          className={cs('z-20')}
          rightSection={<CaretRight size={16} weight="light" />}>
          එක් වන්න
        </Button>

        <div
          className={cs(
            'absolute inset-y-0 skew-x-12',
            'bg-gray-400/50',
            'w-10 h-full',
            'blur-lg',
            'left-0',
            'animate-move-right',
          )}
        />
      </nav>
    </div>
  );
}

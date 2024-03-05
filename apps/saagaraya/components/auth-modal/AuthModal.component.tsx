import { forwardRef } from 'react';
import { Button, Tabs } from '@mantine/core';
import { PencilSimpleLine, SignIn } from '@phosphor-icons/react';
import cs from 'classnames';
import Image from 'next/image';

import { DisplayLanguage } from '@kala-pavura/models';

import { google_icon, surfer_vector } from '@/assets/images';
import { LoginForm, RegisterForm } from '@/components/auth-modal/molecules';
import { useAuth } from '@/modules/context';
import { useFont } from '@/modules/hooks';

type AuthModalComponentProps = {
  isOpen: boolean;
  forceClose: () => void;
};

export const AuthModalComponent = forwardRef<
  HTMLDivElement,
  AuthModalComponentProps
>(({ isOpen, forceClose }, ref) => {
  const { primaryFont: primaryEnglishFont } = useFont(DisplayLanguage.English);

  const { googleLogin } = useAuth();

  const googleLoginHandler = async () => {
    const result = await googleLogin?.();
    if (!result) return;
    forceClose();
  };

  return (
    <div
      ref={ref}
      className={cs(
        'text-black dark:text-white',
        'absolute right-4 top-14',
        {
          hidden: !isOpen,
        },
        'w-96 rounded-md p-5',
        'flex flex-col items-center justify-center',
        'bg-blue-300 dark:bg-zinc-800',
        'border border-zinc-400/20',
      )}>
      <Image src={surfer_vector} alt="surfer vector" width={200} />

      <Tabs radius="md" defaultValue="gallery" className="w-full">
        <Tabs.List justify="center" className="mx-4 overflow-hidden">
          <Tabs.Tab
            value="gallery"
            className="font-medium"
            leftSection={<SignIn size={12} />}>
            පිරීම
          </Tabs.Tab>
          <Tabs.Tab
            value="messages"
            className="font-medium"
            leftSection={<PencilSimpleLine size={12} />}>
            ලියාපදිංචිය
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <LoginForm forceClose={forceClose} />
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <RegisterForm forceClose={forceClose} />
        </Tabs.Panel>
      </Tabs>

      <div className={'mb-8 mt-4 flex w-full items-center opacity-70'}>
        <div className={cs('border-t border-gray-400', 'h-1 w-full')} />
        <div className={cs('px-4 text-xs text-gray-600 dark:text-gray-100')}>
          හෝ
        </div>
        <div className={cs('border-t border-gray-400', 'h-1 w-full')} />
      </div>
      <Button
        leftSection={<Image src={google_icon} alt="google logo" width={20} />}
        variant="white"
        color="black"
        size="xs"
        radius="xl"
        onClick={googleLoginHandler}>
        <span className={cs(primaryEnglishFont.className)}>Google</span>
        &nbsp;ගිණුමකින් එක්වන්න
      </Button>
    </div>
  );
});

AuthModalComponent.displayName = 'AuthModalComponent';

import { forwardRef } from 'react';
import { Button, TextInput } from '@mantine/core';
import { CaretRight } from '@phosphor-icons/react';
import cs from 'classnames';
import Image from 'next/image';

import { DisplayLanguage } from '@kala-pavura/models';

import { google_icon, surfer_vector } from '@/assets/images';
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
    await googleLogin?.();
    forceClose();
  };

  return (
    <div
      ref={ref}
      className={cs(
        'absolute top-[3.5em] right-4',
        {
          hidden: !isOpen,
        },
        'w-96 p-6 rounded-md',
        'flex flex-col items-center justify-center',
        'bg-zinc-500/40 backdrop-blur-md',
        'border border-zinc-400/20',
      )}>
      <Image src={surfer_vector} alt="surfer vector" width={250} />

      <TextInput
        variant="filled"
        size="xs"
        radius="xl"
        label="ඊ-තැපැල් ලිපිනය"
        placeholder="user@email.com"
        className={cs('w-full', 'text-white')}
      />
      <TextInput
        variant="filled"
        size="xs"
        radius="xl"
        label="මුරපදය"
        placeholder="***"
        className={cs('w-full', 'mt-4', 'text-white')}
      />
      <Button
        variant="filled"
        color="#2da1e4"
        size="xs"
        radius="xl"
        className={cs('z-20', 'mt-6')}
        rightSection={<CaretRight size={16} weight="light" />}>
        එක්වන්න
      </Button>
      <div className={cs('flex items-center', 'w-full my-8')}>
        <div className={cs('border-t border-gray-400', 'w-full h-1')} />
        <div className={cs('text-gray-400 px-4', 'text-sm')}>හෝ</div>
        <div className={cs('border-t border-gray-400', 'w-full h-1')} />
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

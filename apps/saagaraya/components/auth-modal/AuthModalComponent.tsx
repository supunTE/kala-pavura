import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Button, Tabs } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { PencilSimpleLine, SignIn } from '@phosphor-icons/react';
import cs from 'classnames';
import Image from 'next/image';

import { DisplayLanguage } from '@kala-pavura/models';

import { google_icon, surfer_vector } from '@/assets/images';
import { LoginForm, RegisterForm } from '@/components/auth-modal/molecules';
import { LOGIN_OR_REGISTER_DIALOG } from '@/constants/dialogs';
import { useAuth } from '@/modules/context';
import { useFontStatic } from '@/modules/hooks';
import { Dispatch, RootState } from '@/store/store';


export const AuthModalComponent = () => {
  const dispatch = useDispatch<Dispatch>()
  const loginDialogVisibility = useSelector((state: RootState) => state.ui.dialogVisibility[LOGIN_OR_REGISTER_DIALOG] || false);

  const close = useCallback(() => {
    dispatch.ui.updateDialogVisibilityReducer({
      key: LOGIN_OR_REGISTER_DIALOG,
      visible: false,
    });
  }, [dispatch.ui]);

  const ref = useClickOutside(close);

  const { primaryFont: primaryEnglishFont } = useFontStatic(
    DisplayLanguage.English,
  );

  const { googleLogin } = useAuth();

  const googleLoginHandler = async () => {
    const result = await googleLogin?.();
    if (!result) return;
    close();
  };

  return (
    <Dialog
      open={loginDialogVisibility}
      onClose={close}
      className='relative z-50'>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-2xl flex w-screen items-center justify-center p-4">
      <DialogPanel className="w-96 rounded-md p-5 text-black dark:text-white bg-blue-300 dark:bg-zinc-800 flex flex-col items-center justify-center border border-zinc-400/20" ref={ref}>
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
          <LoginForm close={close} />
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <RegisterForm close={close} />
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
      </DialogPanel>
      </div>
    </Dialog>
  );
}

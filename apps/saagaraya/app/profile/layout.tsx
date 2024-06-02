import { ReactNode } from 'react';
import cs from 'classnames';

import { DisplayLanguage } from '@kala-pavura/models';

import { BackgroundComponent } from '@/components/background';
import { Navbar } from '@/components/navbar';
import { useFontStatic } from '@/modules/hooks';

type ProfileLayoutProps = {
  children: ReactNode;
  profileCover: ReactNode;
};

export default function ProfileLayout({
  children,
  profileCover,
}: ProfileLayoutProps) {
  const { primaryFont } = useFontStatic(DisplayLanguage.Sinhala);

  return (
    <>
      <BackgroundComponent />
      <div className="absolute top-0 h-screen w-full">
        <Navbar />
      </div>
      <div className={cs(primaryFont.className, 'z-10 h-screen')}>
        {profileCover}
        {children}
      </div>
    </>
  );
}

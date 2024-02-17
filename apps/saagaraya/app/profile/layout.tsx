import { ReactNode } from 'react';
import cs from 'classnames';

import { DisplayLanguage } from '@kala-pavura/models';

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
    <div className={cs(primaryFont.className, 'z-10 h-screen')}>
      {profileCover}
      {children}
    </div>
  );
}

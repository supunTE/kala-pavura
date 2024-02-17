import { AspectRatio } from '@mantine/core';
import cs from 'classnames';
import Image from 'next/image';

import { DisplayLanguage } from '@kala-pavura/models';

import { useFontStatic } from '@/modules/hooks';

type CardImageProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  backgroundColor?: string;
  titleColor?: string;
};

export function CardCover({
  imageSrc,
  imageAlt,
  title,
  backgroundColor,
  titleColor,
}: CardImageProps) {
  const { secondaryFont } = useFontStatic(DisplayLanguage.Sinhala);

  return (
    <div className={cs('relative')}>
      <AspectRatio ratio={1}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={500}
          className={cs('w-full rounded-md', 'object-cover')}
        />
      </AspectRatio>
      <div
        className={cs(
          'absolute inset-0',
          'rounded-md',
          'flex items-center justify-center',
          'transition-all duration-1000 ease-in-out',
        )}
        style={{
          backgroundColor: backgroundColor ?? 'rgba(0, 0, 0)',
        }}>
        <h2
          className={cs(
            'p-4 text-3xl font-bold text-white',
            'text-center line-clamp-3',
            'drop-shadow-3xl',
            'transition-all duration-1000 ease-in-out',
            secondaryFont.className,
          )}
          style={{
            color: titleColor ?? 'white',
          }}>
          {title}
        </h2>
      </div>
    </div>
  );
}

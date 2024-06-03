'use client';

import { useEffect, useState } from 'react';
import { Card } from '@mantine/core';
import cs from 'classnames';

import { DisplayLanguage, ExtractedImageColors } from '@kala-pavura/models';

import { PostInteractionButtonAtom } from '@/components/atoms';
import { useFontStatic } from '@/modules/hooks';
import { extractImageColors } from '@/modules/utils/extract-image-colors';

import { CardCover } from './molecules';

type ContentCardComponentProps = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
};

export function ContentCardComponent({
  id,
  title,
  imageSrc,
  imageAlt,
  description,
}: ContentCardComponentProps) {
  const { primaryFont } = useFontStatic(DisplayLanguage.Sinhala);

  const [imageExtractColors, setImageExtractColors] =
    useState<ExtractedImageColors | null>(null);

  useEffect(() => {
    (async () => {
      const colors = await extractImageColors(imageSrc);
      setImageExtractColors(colors);
    })();
  }, [imageSrc]);

  return (
    <Card
      shadow="sm"
      radius="md"
      className={cs(
        primaryFont.className,
        'transition-all duration-1000 ease-in-out',
      )}
      styles={{
        root: {
          backgroundColor: imageExtractColors?.darkVariant.toString(),
        },
      }}>
      <div>
        <CardCover
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          title={title}
          backgroundColor={imageExtractColors?.darkVariant
            .getDeepCopy()
            ?.setOpacity(0.75)
            .addDarkness(20)
            .toString()}
          titleColor={imageExtractColors?.lightVariant.toString()}
        />

        <PostInteractionButtonAtom id={id} />

        <h6 className={cs('text-sm text-white/40', 'line-clamp-3 leading-6')}>
          {description}
        </h6>

        {/*<Button color="blue" fullWidth mt="md" radius="md">*/}
        {/*  Book classic tour now*/}
        {/*</Button>*/}
      </div>
    </Card>
  );
}

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Drawer, TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import cs from 'classnames';
import Image from 'next/image';

import {
  MAX_BOOK_DESCRIPTION_LENGTH,
  MAX_BOOK_NAME_LENGTH,
} from '@kala-pavura/globals';
import { CoverImage, ImageSource, Story } from '@kala-pavura/models';

import { createBook } from '@/actions/book';
import { getPhotos } from '@/actions/photo';
import {
  TransliteratorInput,
  TransliteratorTextArea,
} from '@/components/atoms';
import { useAuth } from '@/modules/context';
import { NotificationsService } from '@/modules/services';
import {
  createBookDefaultValues,
  CreateBookInputs,
  createBookUISchema,
} from '@/schemas/book';

type CreateBookProps = {
  opened: boolean;
  close: () => void;
};

export function CreateBookPanel({ opened, close }: CreateBookProps) {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<CreateBookInputs>({
    defaultValues: createBookDefaultValues,
    resolver: zodResolver(createBookUISchema),
    mode: 'onChange',
  });

  const { user } = useAuth();

  const [isCreating, setIsCreating] = useState(false);
  const [searchedOnce, setSearchedOnce] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<CoverImage[]>([]);
  const searchImages = useDebouncedCallback(async (query: string) => {
    if (query === '') {
      setSearchResults([]);
      return;
    }
    setSearchedOnce(true);
    setLoading(true);
    setSearchResults(await getPhotos(query));
    setSelectedImage('');
    setLoading(false);
  }, 500);

  const onSubmit: SubmitHandler<CreateBookInputs> = async (data) => {
    if (!user) {
      return NotificationsService.showErrorToast(
        'පුරනය වී නොමැත!',
        'කරුණාකර පොතක් සැදීමට පෙර ඔබේ පවතින ගිණුමට පුරනය වීම හෝ නව ගිණුමකින් ලියාපදිංචි වන්න.',
      );
    }
    setIsCreating(true);
    // TODO: Create utils
    const result = JSON.parse(await createBook(data, user.uid)) as
      | Story
      | { error: string }
      | undefined;
    setIsCreating(false);

    // TODO: write validator utils
    if (!result || 'error' in result) {
      return NotificationsService.showErrorToast(
        'දෝෂයක්!',
        'කිසියම් ගැටළුවක් මතු විය. පසුව උත්සාහ කරන්න.',
      );
    }

    NotificationsService.showSuccessToast(
      'සාර්ථකයි!',
      `${data.name} පොත සාදන ලදි.`,
    );
    reset();
    close();
  };

  const nameInputTrnasliterateKey = 'name-input';
  console.log({ ...register('name') });
  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="පොතක් සෑදීම"
      position="right"
      offset={12}
      radius="lg">
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <TransliteratorInput
          enableTransliteration={true}
          label="නම"
          placeholder="මඩොල් දූව"
          data-autofocus
          withAsterisk
          maxLength={MAX_BOOK_NAME_LENGTH}
          key={nameInputTrnasliterateKey}
          error={errors.name?.message}
          onChange={(event) => {
            setValue('name', event.target.value);
          }}
        />

        <TransliteratorTextArea
          enableTransliteration={true}
          label="විස්තරය"
          rows={8}
          placeholder="උපාලි ගිනිවැල්ල කියන්නේ දකුණු ලංකාවේ ගමක ජීවත් වෙන කොල්ලෙක්. වයස අවුරුදු 7 ක් පමණ වන කුඩා කාලයේදීම මව අහිමි වූ ඔහු කුඩම්මාගේ රැකවරණය යටතේ සිටියි. ජින්නා ඔවුන්ගේ නිවසේ සේවක පිරිමි ළමයා වන අතර උපාලිගේ සමීපතම සහ විශ්වාසවන්ත මිතුරෙකි..."
          mt="md"
          withAsterisk
          maxLength={MAX_BOOK_DESCRIPTION_LENGTH}
          error={errors.description?.message}
          /* TODO: Check error */
          /*{...register('description')}*/
          onChange={(event) => {
            setValue('description', event.target.value);
          }}
        />

        <TextInput
          mt="md"
          label="පිටකවර රූපය"
          placeholder="forest, beach, mountain,..."
          onChange={(event) => {
            setSearchQuery(event.currentTarget.value);
            searchImages(event.currentTarget.value);
          }}
          value={searchQuery}
          data-autofocus
          withAsterisk
          error={errors.coverImage?.id?.message}
        />

        {loading ? (
          <div className="my-4">රූප සොයමින්...</div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchResults.length === 0 &&
              !searchedOnce &&
              searchQuery !== '' && (
                <div className="text-neutral-400">කිසිවක් හමු නොවුණි.</div>
              )}
            {searchResults.map((result, index) => (
              <Image
                key={index}
                src={result.thumbnail}
                alt={result.alt || 'image'}
                width={128}
                height={128}
                onClick={() => {
                  setSelectedImage(result.id);
                  setValue('coverImage', {
                    ...result,
                    source: ImageSource.Unsplash,
                  });
                  clearErrors('coverImage');
                }}
                className={cs(
                  'h-24 w-24 cursor-pointer rounded-lg border-4 object-cover transition-all hover:scale-125 hover:border-blue-200 hover:shadow-lg',
                  {
                    'border-blue-500': selectedImage === result.id,
                    'border-transparent': selectedImage !== result.id,
                  },
                )}
              />
            ))}
          </div>
        )}
        <Button
          type="submit"
          variant="filled"
          radius="xl"
          mt="md"
          disabled={isCreating}>
          සාදන්න
        </Button>
      </form>
    </Drawer>
  );
}

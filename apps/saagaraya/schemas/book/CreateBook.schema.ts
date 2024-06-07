import { z } from 'zod';

import {
  MAX_BOOK_DESCRIPTION_LENGTH,
  MAX_BOOK_NAME_LENGTH,
  MIN_BOOK_DESCRIPTION_LENGTH,
  MIN_BOOK_NAME_LENGTH,
} from '@kala-pavura/globals';
import { ImageSource } from '@kala-pavura/models';

// export const createBookUISchema = object({
//   name: string().required('පොතට නමක් ඇතුළත් කරන්න.'),
//   description: string().required('පොත සඳහා විස්තරයක් ඇතුළත් කරන්න.'),
//   coverImage: object({
//     id: string().required('පිටකවර රූපය තෝරන්න.'),
//     thumbnail: string(),
//     small: string(),
//     regular: string(),
//     imageAuthor: string(),
//     alt: string(),
//     source: string().oneOf(Object.values(ImageSource)),
//   }).required(),
// });

// export const createBookServerSchema = z.object({
//   name: z.string(),
//   description: z.string(),
//   coverImage: z.object({
//     id: z.string(),
//     thumbnail: z.string(),
//     small: z.string(),
//     regular: z.string(),
//     imageAuthor: z.string(),
//     alt: z.string(),
//     source: z.nativeEnum(ImageSource),
//   }),
// });

const getSchema = (isUI: boolean) =>
  z.object({
    name: z
      .string()
      .min(MIN_BOOK_NAME_LENGTH, isUI ? 'පොතට නමක් ඇතුළත් කරන්න.' : undefined)
      .max(
        MAX_BOOK_NAME_LENGTH,
        isUI
          ? `පොතේ නම සංකේත ${MAX_BOOK_NAME_LENGTH}කට වඩා අඩු විය යුතු ය.`
          : undefined,
      ),
    description: z
      .string()
      .min(
        MIN_BOOK_DESCRIPTION_LENGTH,
        isUI
          ? `පොත සඳහා අවමය සංකේත ${MIN_BOOK_DESCRIPTION_LENGTH}ක විස්තරයක් ඇතුළත් කරන්න.`
          : undefined,
      )
      .max(
        MAX_BOOK_DESCRIPTION_LENGTH,
        isUI
          ? `පොතේ විස්තරය සංකේත ${MAX_BOOK_DESCRIPTION_LENGTH}කට වඩා අඩු විය යුතු ය.`
          : undefined,
      ),
    coverImage: z.object({
      id: z.string().min(1, isUI ? 'පිටකවර රූපය තෝරන්න.' : undefined),
      thumbnail: z.string(),
      small: z.string(),
      regular: z.string(),
      imageAuthor: z.string(),
      alt: z.string(),
      source: z.nativeEnum(ImageSource),
    }),
  });

export const createBookUISchema = getSchema(true);
export const createBookServerSchema = getSchema(false);

export type CreateBookInputs = z.infer<typeof createBookUISchema>;
export const createBookDefaultValues: CreateBookInputs = {
  name: '',
  description: '',
  coverImage: {
    id: '',
    thumbnail: '',
    small: '',
    regular: '',
    imageAuthor: '',
    alt: '',
    source: ImageSource.Unsplash,
  },
};

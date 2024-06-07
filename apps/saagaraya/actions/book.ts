'use server';

import { revalidatePath } from 'next/cache';

import { BookFirestoreDao } from '@kala-pavura/db';

import { CreateBookInputs, createBookServerSchema } from '@/schemas/book';

import { adminDB } from '../firebase-admin.config';

const bookdao = new BookFirestoreDao(adminDB);

export async function createBook(bookData: CreateBookInputs, userId: string) {
  // TODO: make a error response structure
  const validatedFields = createBookServerSchema.safeParse(bookData);

  if (!validatedFields.success) {
    return JSON.stringify({
      error: validatedFields.error.flatten().fieldErrors,
    });
  }

  try {
    const response = await bookdao.createBook(
      validatedFields.data.name,
      validatedFields.data.description,
      userId,
      validatedFields.data.coverImage,
    );
    revalidatePath('/user/[id]');
    return JSON.stringify(response);
  } catch (e) {
    return JSON.stringify({
      error: e instanceof Error ? e.message : e,
    });
  }
}

export async function getBooksByUserId(userId: string) {
  const response = await bookdao.getBooksByUserId(userId);
  return response;
}

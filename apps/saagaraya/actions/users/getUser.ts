'use server';

import { db } from 'apps/saagaraya/firebase.config';

import { UserFirestoreDao } from '@kala-pavura/db';

export async function getUser() {
  const userdao = new UserFirestoreDao(db);
  userdao.getUser('uid');
}

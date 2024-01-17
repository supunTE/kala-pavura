import {
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { KalaPavuraExtendedUser, KalaPavuraUser } from '@kala-pavura/models';

import 'firebase/firestore';

export class UserFirestoreService {
  constructor(private db: Firestore) {}

  async getUser(uid: string) {
    const docRef = doc(collection(this.db, 'users'), uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as KalaPavuraExtendedUser;
    } else {
      return null;
    }
  }

  public async addOrUpdateUser(
    uid: string,
    user: KalaPavuraUser,
  ): Promise<KalaPavuraExtendedUser> {
    const existingUser = await this.getUser(uid);
    if (existingUser) {
      await this.updateLastLoginAt(uid);
      return existingUser;
    } else {
      return await this.addUser(uid, user);
    }
  }

  private async addUser(
    uid: string,
    user: KalaPavuraUser,
  ): Promise<KalaPavuraExtendedUser> {
    const extendedUser: KalaPavuraExtendedUser = {
      ...user,
      joinedAt: new Date(),
      lastLoginAt: new Date(),
    };

    const docRef = doc(collection(this.db, 'users'), uid);
    await setDoc(docRef, extendedUser);
    return extendedUser;
  }

  private async updateLastLoginAt(uid: string): Promise<Date> {
    const docRef = doc(collection(this.db, 'users'), uid);

    const timestamp = new Date();
    await updateDoc(docRef, {
      lastLoginAt: new Date(),
    });
    return timestamp;
  }
}

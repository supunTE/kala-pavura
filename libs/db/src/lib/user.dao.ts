import {
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { ExtendedUser, User } from '@kala-pavura/models';

import 'firebase/firestore';

export class UserFirestoreDao {
  constructor(private db: Firestore) {}

  async getUser(uid: string) {
    const docRef = doc(collection(this.db, 'users'), uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as ExtendedUser;
    } else {
      return null;
    }
  }

  public async addOrUpdateUser(uid: string, user: User): Promise<ExtendedUser> {
    const existingUser = await this.getUser(uid);
    if (existingUser) {
      await this.updateLastLoginAt(uid);
      return existingUser;
    } else {
      return await this.addUser(uid, user);
    }
  }

  public async addUser(uid: string, user: User): Promise<ExtendedUser> {
    const extendedUser: ExtendedUser = {
      ...user,
      joinedAt: new Date(),
      lastLoginAt: new Date(),
    };

    const docRef = doc(collection(this.db, 'users'), uid);
    // TODO: [FIRESTORE] Add firebase rules
    await setDoc(docRef, extendedUser);
    return extendedUser;
  }

  public async updateLastLoginAt(uid: string): Promise<Date> {
    const docRef = doc(collection(this.db, 'users'), uid);

    const timestamp = new Date();
    // TODO: [FIRESTORE] Add firebase rules. (avoid updating joinedAt, uid, etc)
    await updateDoc(docRef, {
      lastLoginAt: new Date(),
    });
    return timestamp;
  }
}

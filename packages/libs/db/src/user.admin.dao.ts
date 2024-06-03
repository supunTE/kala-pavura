import { Firestore } from 'firebase-admin/firestore';


import { ExtendedUser, User } from '@kala-pavura/models';

export class UserAdminFirestoreDao {
  constructor(private db: Firestore) {
  }

  public async getUser(uid: string) {
    const docRef = this.db.collection('users').doc(uid);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      return {
        ...docSnap.data(),
        joinedAt: new Date(docSnap.data()!.joinedAt.seconds * 1000),
        lastLoginAt: new Date(docSnap.data()!.lastLoginAt.seconds * 1000),
      } as ExtendedUser;
    } else {
      return null;
    }
  }

  public async getUserByUsername(username: string) {
    const usersRef = this.db.collection('users');
    const query = usersRef.where('username', '==', username);
    const querySnapshot = await query.get();

    if (querySnapshot.empty || !querySnapshot.docs[0]) {
      return null;
    } else {
      return querySnapshot.docs[0].data() as ExtendedUser;
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

    const docRef = this.db.collection('users').doc(uid);
    await docRef.set(extendedUser);
    return extendedUser;
  }

  public async updateLastLoginAt(uid: string): Promise<Date> {
    const docRef = this.db.collection('users').doc(uid);

    const timestamp = new Date();
    await docRef.update({
      lastLoginAt: new Date(),
    });
    return timestamp;
  }
}

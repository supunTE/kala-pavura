import { Firestore } from 'firebase/firestore';

export class PostFirestoreDao {
  constructor(private db: Firestore) {}
}

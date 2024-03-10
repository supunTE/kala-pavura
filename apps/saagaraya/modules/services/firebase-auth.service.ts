import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { DEFAULT_USER_IMG_URL } from '@kala-pavura/constants';
import { UserFirestoreDao } from '@kala-pavura/db';
import { ExtendedUser, User, UserLoginState } from '@kala-pavura/models';
import { Logger } from '@kala-pavura/services';

import { db, firebaseApp } from '../../firebase.config';

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

const userFirestoreService = new UserFirestoreDao(db);
const logger = new Logger('Firebase Auth Context');

type AuthStateChangeListenerProps = {
  updateLoginState: (userLoginState: UserLoginState) => void;
  setUser: (user: ExtendedUser | null) => void;
};

export class FirebaseAuthService {
  /** Use through auth context */
  static googleLoginWithPopup = async (
    setUser: (user: ExtendedUser) => void,
  ) => {
    const result = await signInWithPopup(auth, provider);

    /// Add or update user in firestore
    const user = result.user;
    const { uid, displayName, email, photoURL, phoneNumber } = user;
    const username = displayName!.replace(' ', '_').toLowerCase() || 'user';
    const profilePicture = photoURL || DEFAULT_USER_IMG_URL;

    if (!email) throw new Error('Email not found');

    const userObj = {
      uid,
      username,
      email,
      phoneNumber,
      profilePicture,
      firstName: null,
      lastName: null,
    };
    const kalaPavuraUser = await userFirestoreService.addOrUpdateUser(
      uid,
      userObj,
    );
    setUser(kalaPavuraUser);
  };

  /** Use through auth context */
  static passwordRegister = async (
    username: string,
    emailAddress: string,
    password: string,
    setUser: (user: ExtendedUser) => void,
  ) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      emailAddress,
      password,
    );

    /// Add or update user in firestore
    const user = result.user;
    const userObj: User = {
      username,
      uid: user.uid,
      email: emailAddress,
      phoneNumber: null,
      profilePicture: DEFAULT_USER_IMG_URL,
      firstName: null,
      lastName: null,
    };

    const kalaPavuraUser = await userFirestoreService.addUser(
      user.uid,
      userObj,
    );
    setUser(kalaPavuraUser);
  };

  /** Use through auth context */
  static passwordLogin = async (
    emailAddress: string,
    password: string,
    setUser: (user: ExtendedUser) => void,
  ) => {
    const result = await signInWithEmailAndPassword(
      auth,
      emailAddress,
      password,
    );
    const uid = result.user.uid;
    const kalaPavuraUser = await userFirestoreService.getUser(uid);
    if (!kalaPavuraUser) throw new Error('User not found');
    await userFirestoreService.updateLastLoginAt(uid);
    setUser(kalaPavuraUser);
  };

  static accountLogout = async () => {
    await auth.signOut();
  };

  static authStateChangeListener = ({
    updateLoginState,
    setUser,
  }: AuthStateChangeListenerProps) => {
    const existingUserId: string | null = null;
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        updateLoginState(UserLoginState.LoggedIn);

        if (existingUserId && existingUserId === user.uid) return;
        setUser(await userFirestoreService.getUser(user.uid));
      } else updateLoginState(UserLoginState.LoggedOut);
    });
  };
}

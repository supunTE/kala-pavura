import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { DEFAULT_USER_IMG_URL } from '@kala-pavura/constants';
import { UserFirestoreDao } from '@kala-pavura/db';
import {
  KalaPavuraExtendedUser,
  KalaPavuraUser,
  UserLoginState,
} from '@kala-pavura/models';
import { Logger } from '@kala-pavura/services';

import { db, firebaseApp } from '../../firebase.config';

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

const userFirestoreService = new UserFirestoreDao(db);

const logger = new Logger('Firebase Auth Context');
export const googleLoginWithPopup = async (
  setUser: (user: KalaPavuraExtendedUser) => void,
) => {
  try {
    const result = await signInWithPopup(auth, provider);

    /// Add or update user in firestore
    const user = result.user;
    const { uid, displayName, email, photoURL, phoneNumber } = user;
    const username = displayName!.replace(' ', '_').toLowerCase() || 'user';
    const profilePicture = photoURL || DEFAULT_USER_IMG_URL;
    const userObj: KalaPavuraUser = {
      uid,
      username,
      email,
      phoneNumber,
      profilePicture,
    };
    const kalaPavuraUser = await userFirestoreService.addOrUpdateUser(
      uid,
      userObj,
    );
    setUser(kalaPavuraUser);
    /// ===
  } catch (error) {
    logger.error('Error while logging in with Google', error);
  }
};

export const accountLogout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    logger.error('Error while logging out', error);
  }
};

type AuthStateChangeListenerProps = {
  updateLoginState: (userLoginState: UserLoginState) => void;
  setUser: (user: KalaPavuraExtendedUser | null) => void;
};
export const authStateChangeListener = ({
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

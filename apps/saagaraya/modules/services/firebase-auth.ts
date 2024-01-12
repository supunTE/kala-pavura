import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { Logger } from '@/modules/services/logger';

const provider = new GoogleAuthProvider();
const auth = getAuth();

const logger = new Logger('Firebase Auth');

signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential) return;
  })
  .catch((error) => {
    logger.error(error);
  });

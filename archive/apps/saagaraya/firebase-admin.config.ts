import 'server-only';

import { cert, initializeApp } from 'firebase-admin/app';
import { apps } from 'firebase-admin';

import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase
const adminJSON = JSON.parse(process.env.FIREBASE_ADMIN_JSON || '');
const APP_NAME = 'adminApp';

export let firebaseAdminApp = apps.find((app) => app?.name === APP_NAME) || initializeApp(
  {
    credential: cert(adminJSON),
  },
  APP_NAME,
);

export const adminDB = getFirestore(firebaseAdminApp);

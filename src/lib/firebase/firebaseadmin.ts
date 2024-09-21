// lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';
import serviceAccount from '@/lib/firebase/serviceaccount';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const firestore = admin.firestore();
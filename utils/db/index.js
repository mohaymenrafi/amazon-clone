import admin from 'firebase-admin';
import serviceAccount from '../../firebase-service-account-config.json';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.message);
  }
}

export default admin.firestore();

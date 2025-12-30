const admin = require('firebase-admin');

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

  // This is the "magic" line that fixes the hang
  if (serviceAccount.private_key && !serviceAccount.private_key.includes('\n')) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  console.log("✅ Firebase Admin Initialized");
} catch (error) {
  console.error("❌ Firebase Init Error:", error);
}

const db = admin.firestore();
module.exports = { db };
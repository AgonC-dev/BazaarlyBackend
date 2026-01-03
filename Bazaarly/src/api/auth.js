import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  updateProfile,
  EmailAuthProvider,
  linkWithCredential
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

// REGISTER
export async function register(name, email, password) {
 const currentUser = auth.currentUser;
 let user;

 if(currentUser && currentUser.isAnonymous) {
  try {
    const credential = EmailAuthProvider.credential(email, password);
    const linkResult = await linkWithCredential(currentUser, credential);
    user = linkResult.user;
    console.log("🔗 Account linked successfully. UID remained:", user.uid);
  } catch (error) {
    console.error("Linking failed, falling back to standard registration", error);
      // Fallback if linking fails (e.g., if the user was guest but email is taken)
      const res = await createUserWithEmailAndPassword(auth, email, password);
      user = res.user;
  }
 } else {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  user = res.user;
 }
  try {
    await updateProfile(user, { displayName: name });
  } catch (err) {
    console.log('PROFILE UPDATE FAILED', err);
  }

  // Save to Firestore
  // Note: We use merge: true so we don't accidentally overwrite 
  // an existing cart if it's already there!
  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    updatedAt: new Date()
  }, { merge: true });

  return user;
 

}

// LOGIN
export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

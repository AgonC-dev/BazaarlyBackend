import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

// REGISTER
export async function register(name, email, password) {
  const res = await createUserWithEmailAndPassword(auth, email, password);


  try {
     await updateProfile(res.user, { displayName: name });
  } catch (err) {
    console.log('PROFILE UPDATE FAILED', err)
  }
 

  await setDoc(doc(db, "users", res.user.uid), {
    name,
    email,
    cart: [] // OPTIONAL — later used for per-user carts
  });

  return res.user;
}

// LOGIN
export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

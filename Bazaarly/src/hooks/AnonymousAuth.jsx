import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from '../api/firebase.js';
import { useEffect } from "react";
import { useState } from "react";



function useAnonymousAuth() {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if(currentUser) {
            setUser(currentUser);
            setLoading(false);
            console.log("👤 User is signed in:", currentUser.uid);
        } else {
            signInAnonymously(auth)
            .catch((error) => {
                console.error(error.message, error.code );
                setLoading(false)
            })
        }
    })

    return () => unsubscribe();
 }, [])

 return { user, loading};
}

export default useAnonymousAuth;
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

//google gmail ile login olmaq ucun
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);





///login oldugca databasedeki users collectionuna atiram useri ve bu funksiya app.jsde useefect olanca isleyir
export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const { uid } = userAuth;
  console.log(uid);
  const userRef = firestore.doc(`users/${uid}`);

  

  const snapshot = await userRef.get();

  

  if (!snapshot.exists) {
    const { displayName, email,photoURL } = userAuth;

    const timestamps = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamps,
        ...additionalData,
      });

      console.log(userRef);
    } catch (error) {
      console.log(error);
    }
  }
  return userRef;
};

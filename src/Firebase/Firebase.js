// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore,collection} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgyANUwGqiHaBGN0ivG9KBzfh0XAcJbiw",
  authDomain: "animeinfo-2dca1.firebaseapp.com",
  projectId: "animeinfo-2dca1",
  storageBucket: "animeinfo-2dca1.appspot.com",
  messagingSenderId: "658885324147",
  appId: "1:658885324147:web:dc1151de32971583022906"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const reviewsRef=collection(db,'reviews')
export const usersRef = collection(db, "users");
export default app;
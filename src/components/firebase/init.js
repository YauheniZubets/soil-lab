// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgd8YYxaKIj5RLindpcCqQNkawLRlh9dw",
  authDomain: "soil-lab.firebaseapp.com",
  projectId: "soil-lab",
  storageBucket: "soil-lab.appspot.com",
  messagingSenderId: "990395552361",
  appId: "1:990395552361:web:33a49df66b3ce8805c08f8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
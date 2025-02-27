// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZRxfZodTgyJnSGFg6Vr-2iN4b5Jxuy-w",
  authDomain: "reactnative-quikconnect.firebaseapp.com",
  databaseURL: "https://reactnative-quikconnect-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reactnative-quikconnect",
  storageBucket: "reactnative-quikconnect.appspot.com",
  messagingSenderId: "138617790781",
  appId: "1:138617790781:web:0f6d7b75cd8e0f2be02554",
  measurementId: "G-FT49G6CJBQ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export { database }

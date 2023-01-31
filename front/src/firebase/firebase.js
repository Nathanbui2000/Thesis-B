// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAEeNF_E4-_y5_QXqhRFi-_-iD10usgHd4",
//   authDomain: "coursemania-a83b1.firebaseapp.com",
//   projectId: "coursemania-a83b1",
//   storageBucket: "coursemania-a83b1.appspot.com",
//   messagingSenderId: "205326958030",
//   appId: "1:205326958030:web:84823ed8b48e49f360bf9f",
//   measurementId: "G-WNPJWE06MP"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGY40zG3BtrLjxxn26XF4hwB-KRmD4Wag",
  authDomain: "coursemania-fa6ce.firebaseapp.com",
  projectId: "coursemania-fa6ce",
  storageBucket: "coursemania-fa6ce.appspot.com",
  messagingSenderId: "299397696934",
  appId: "1:299397696934:web:4125e6893eccdcfe44d367",
  measurementId: "G-1KE8ENZNSN",
  source: "/api/myFunction",
  function: "doStuff",
  origin: ["*"],
  method: ["GET"],
  maxAgeSeconds: 3600
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

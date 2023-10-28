// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWhQlM3JUIwzg0HaXsi3mafttoyx3XpKs",
  authDomain: "alice-project-2023.firebaseapp.com",
  projectId: "alice-project-2023",
  storageBucket: "alice-project-2023.appspot.com",
  messagingSenderId: "588135973898",
  appId: "1:588135973898:web:819b2c34bfbf71acc88bf3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app